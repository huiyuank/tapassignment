const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const csv = require("csv-parser");
const fs = require("fs");
const asyncWrapper = require("./util/helper");

const mongoose = require("mongoose");
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
app.use(express.urlencoded({ extended: true }));
// For parsing json
app.use(express.json());

// Meant for front end API call to pull all employee data
app.get("/api/users", (req, res) => {
  //   res.json();
});

// Meant for front end render form page
app.get("/users/upload", (req, res) => {
  res.sendFile(path.join(__dirname + "/form.html"));
});

// Arrays to determine required headers in form
const headers = ["id", "login", "name", "salary"];

/*
 * Handles upload csv data as a single transaction to either insert and/or update rows or reject wholly
 * @param {Array} employees - Array of employee data in objects
 */
async function insertOrUpdateEmployee(employees) {
  const uploadSession = await mongoose.startSession();
  let statusCode,
    statusMessage = [];
  const opts = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };
  try {
    await uploadSession.withTransaction(async () => {
      for (let [index, employee] of employees.entries()) {
        if (employee.id.startsWith("#")) {
          statusMessage.push(`Comment detected (Row ${index + 1})`);
          continue;
        }
        if (Object.values(employee).some((val) => val === null || val === "")) {
          statusCode = 400;
          statusMessage.push(
            `Unsuccessful upload: Empty fields detected (Row ${index + 1})`
          );
          continue;
        }
        if (Object.keys(employee).some((header) => !headers.includes(header))) {
          statusCode = 400;
          statusMessage.push(
            `Unsuccessful upload: Extra fields detected (Row ${index + 1})`
          );
          continue;
        }
        if (isNaN(employee.salary) || employee.salary < 0) {
          statusCode = 400;
          statusMessage.push(
            `Unsuccessful upload: Salary input '${
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
            // Do update (no change login)
            employeeSearchByLogin.name = employee.name;
            employeeSearchByLogin.salary = employee.salary;
            await employeeSearchByLogin.save();
          } else {
            statusCode = 400;
            statusMessage.push(
              `Unsuccessful upload: Duplicate login '${
                employee.login
              }' detected (Row ${index + 1})`
            );
          }
        } else {
          // Do insert or update (change login)
          console.log(employee);
          await Employee.findOneAndUpdate({ id: employee.id }, employee, {
            upsert: true,
            runValidators: true,
            session: uploadSession,
          });
        }
      }
      if (statusCode) {
        await uploadSession.abortTransaction();
      } else {
        statusCode = 200;
        statusMessage.push("Successful upload!");
      }
    }, opts);
  } catch (err) {
    console.log(err);
  } finally {
    await uploadSession.endSession();
  }
  return { statusCode, statusMessage };
}

app.post(
  "/users/upload",
  upload.single("employees"),
  asyncWrapper(async (req, res, next) => {
    const results = [];
    if (req.file) {
      fs.createReadStream(req.file.path, { encoding: "utf8" })
        .pipe(
          csv({
            mapHeaders: ({ header }) => header.toLowerCase().trim(),
          })
        )
        .on("data", async (data) => {
          results.push(data);
        })
        .on("end", async () => {
          const { statusCode, statusMessage } = await insertOrUpdateEmployee(
            results
          ).catch((err) => console.log("Unsuccessful upload: " + err.message));
          console.log(statusCode, statusMessage);
        })
        .on("error", (err) => {
          console.log("Unsuccessful upload: " + err.message);
        });
    } else {
      console.log("Unsuccessful upload: Empty file");
    }
    res.redirect("/users/upload");
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server listening on port 8080!");
});
