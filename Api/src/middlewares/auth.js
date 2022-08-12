const jwt = require("jsonwebtoken");
const CONFIG = require("../config.js");
const User = require("../models/Users.js");
const Role = require("../models/Role.js");

//*---------------

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  //console.log(token);
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, CONFIG.SECRET);
    req.userId = decoded.id;

    //    console.log(decoded);
    const user = await User.findById(req.userId, { password: 0 });//para que no me devuelva la contraseña
    if (!user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (error) {
    return res.status(401).json({message: 'Unautorized'})
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Moderator") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  verifyToken,
  isModerator,
  isAdmin,
};
