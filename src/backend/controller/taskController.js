const Task = require("../model/task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).send(tasks);
};

const addTask = async (req, res) => {
  try {
    const properties = ["title", "description", "dueDate", "type"];
    const exists = properties.every((property) =>
      JSON.stringify(req.body).includes(property)
    );
    if (!exists) {
      return res.status(400).send("Invalid Properties provided...!");
    }
    let taskObject = req.body;
    taskObject.duedate = taskObject.dueDate;
    delete taskObject.dueDate;

    const task = await new Task(taskObject).save();
    res.status(201).send(task);
  } catch (error) {}
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const properties = ["title", "description", "dueDate", "type"];
    const exists = properties.every((property) =>
      JSON.stringify(req.body).includes(property)
    );
    if (!exists) {
      return res.status(400).send("Invalid Properties provided...!");
    }
    properties.forEach((property) => (task[property] = req.body[property]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send("No task found");
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
    });

    if (!task) {
      res.status(404).send();
    }
  } catch (error) {
    res.status(400).send("No Task Found");
  }
};

module.exports = { getAllTasks, updateTask, addTask, deleteTask };
