const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  id: {
    type: String,
    required: [true, "Employee ID required."],
    unique: [true, "Employee ID must be unique."],
  },
  login: {
    type: String,
    required: [true, "Employee login required."],
    unique: [true, "Employee login must be unique."],
  },
  name: {
    type: String,
    required: [true, "Employee name required."],
  },
  salary: {
    type: Number,
    min: [0, "Employee salary must be at least 0.00, got {VALUE}"],
    required: [true, "Employee salary required."],
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
