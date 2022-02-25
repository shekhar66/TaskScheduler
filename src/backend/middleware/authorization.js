const User = require("../model/user");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedKey = jwt.verify(token, "userauthtoken");
    const user = await User.findOne({
      _id: decodedKey._id,
      "tokens.token": token,
    });
    if (!user) {
      return res.status(401).send("Invalid Token");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send("Authentication failed");
  }
};

module.exports = authorization;
