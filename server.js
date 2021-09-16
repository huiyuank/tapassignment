const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const asyncWrapper = require("./util/helper");

const mongoose = require("mongoose");
// Database connection URL
const dbUrl = "mongodb://localhost:27017/employeeData?replicaSet=rs0";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(
    console,
    "Error encountered when connecting to MongoDB! Connection error:"
  )
);
db.once("open", function () {
  console.log("Connection to MongoDB successful!");
});
const Employee = require("./models/employee");

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// For parsing json
app.use(express.json());
// Enable cross-origin request (CORS) to let the server tell the browser it's permitted to use an additional origin
app.use(cors());

// Meant for front end API call to pull all employee data
app.get(
  "/api/users",
  asyncWrapper(async (req, res, next) => {
    let {
      minSalary = 0,
      maxSalary = 999999999,
      offset = 0,
      limit = 30,
      sort = "+id",
    } = req.query;
    [minSalary, maxSalary, offset, limit] = [
      minSalary,
      maxSalary,
      offset,
      limit,
    ].map(Number);
    const sortAscending = sort.charAt(0) === "+" ? true : false;
    const sortKey = sort.slice(1);
    const totalEmployees = await Employee.count({
      salary: {
        $gte: minSalary,
        $lte: maxSalary,
      },
    });
    const totalPages = Math.ceil(totalEmployees / 30);
    const employees = await Employee.find({
      salary: { $gte: minSalary, $lte: maxSalary },
    })
      .skip(offset * limit)
      .limit(limit)
      .sort();
    res.json({
      totalEmployeeCount: totalEmployees,
      totalPages: totalPages,
      results: employees,
    });
  })
);

// Array to determine required file types
const fileTypes = [
  "application/vnd.ms-excel",
  "text/csv",
  "text/x-csv",
  "text/plain",
];

// Array to determine required headers in form
const headers = ["id", "login", "name", "salary"];

/*
 * Handles upload csv data as a single transaction to either insert and/or update rows or reject wholly
 * @param {Array} employees - Array of employee data in objects
 */
async function insertOrUpdateEmployee(employees) {
  const uploadSession = await mongoose.startSession();
  let statusCode,
    statusMessage,
    statusDetail = [];
  const opts = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };
  try {
    await uploadSession.withTransaction(async () => {
      for (let [index, employee] of employees.entries()) {
        if (employee.id.startsWith("#")) {
          statusDetail.push(`WARNING: Comment detected (Row ${index + 1})`);
          continue;
        }
        if (Object.values(employee).some((val) => val === null || val === "")) {
          statusCode = 400;
          statusDetail.push(`Empty fields detected (Row ${index + 1})`);
          continue;
        }
        if (Object.keys(employee).some((header) => !headers.includes(header))) {
          statusCode = 400;
          statusDetail.push(`Extra fields detected (Row ${index + 1})`);
          continue;
        }
        if (isNaN(employee.salary) || employee.salary < 0) {
          statusCode = 400;
          statusDetail.push(
            `Salary input '${
              employee.salary
            }' received, expected numerical value >= 0.0 (Row ${index + 1})`
          );
          continue;
        }
        const employeeSearchByLogin = await Employee.findOne({
          login: employee.login,
        }).session(uploadSession);
        if (employeeSearchByLogin) {
          if (employeeSearchByLogin.id === employee.id) {
            // Do update (login no change)
            employeeSearchByLogin.name = employee.name;
            employeeSearchByLogin.salary = employee.salary;
            await employeeSearchByLogin.save();
          } else {
            statusCode = 400;
            statusDetail.push(
              `Duplicate login '${employee.login}' detected (Row ${index + 1})`
            );
          }
        } else {
          // Do insert or update (login change) without login conflicts
          await Employee.findOneAndUpdate({ id: employee.id }, employee, {
            upsert: true,
            runValidators: true,
            session: uploadSession,
          });
        }
      }
      if (statusCode) {
        statusMessage = "Upload failed";
        await uploadSession.abortTransaction();
      } else {
        statusCode = 200;
        statusMessage = "Successful upload";
      }
    }, opts);
  } catch (err) {
    console.log(err);
  } finally {
    await uploadSession.endSession();
  }
  return { statusCode, statusMessage, statusDetail };
}

app.post(
  "/users/upload",
  upload.single("employees"),
  asyncWrapper(async (req, res, next) => {
    const results = [];
    const { originalname, path } = req.file;
    if (req.file) {
      // Ensure file uploaded is strictly csv file and utf-8
      if (!fileTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          status: 400,
          message: "Upload failed",
          detail: ["Only csv file with encoding utf-8 allowed "],
          filename: originalname,
        });
      }
      fs.createReadStream(path, { encoding: "utf8" })
        .pipe(
          csv({
            mapHeaders: ({ header }) => header.toLowerCase().trim(),
          })
        )
        .on("data", (data) => {
          results.push(data);
        })
        .on("end", async () => {
          const { statusCode, statusMessage, statusDetail } =
            await insertOrUpdateEmployee(results).catch((err) =>
              console.log(err)
            );
          return res.status(statusCode).json({
            status: statusCode,
            message: statusMessage,
            detail: statusDetail,
            filename: originalname,
          });
        })
        .on("error", (err) => {
          console.log(err);
        });
    } else {
      res.status(400).json({
        status: 400,
        message: "Upload failed",
        detail: ["Empty file"],
      });
    }
  })
);

// Port for serving backend
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server listening on port 8080!");
});
