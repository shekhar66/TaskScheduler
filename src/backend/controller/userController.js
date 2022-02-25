const User = require("../model/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send();
  }
};
const addUser = async (req, res) => {
  try {
    const updates = ["email", "password", "age", "name"];
    const allowedProps = updates.every((update) =>
      JSON.stringify(req.body).includes(update)
    );
    if (!allowedProps) {
      throw new Error("Invalid properties...!!");
    }
    const user = new User(req.body);

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      throw new Error("User not found");
    }
    const props = ["name", "email", "age"];
    props.forEach((prop) => {
      if (JSON.stringify(req.body).includes(prop)) {
        user[prop] = req.body[prop];
      }
    });
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
    });

    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getAllUsers, addUser, updateUser, deleteUser, userLogin };
