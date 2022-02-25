const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  duedate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Task = new mongoose.model("task", taskSchema);

module.exports = Task;
