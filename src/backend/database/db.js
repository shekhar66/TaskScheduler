const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shekhar:root@cluster0.mlnx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

console.log("Connected to database....!!!!");
