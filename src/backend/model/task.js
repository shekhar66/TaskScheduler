const mongoose = require("mongoose");

const Task = new mongoose.model("task", {
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

module.exports = Task;
