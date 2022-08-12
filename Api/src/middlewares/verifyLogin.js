const User = require("../models/Users.js");
const roles = ["User", "Admin"];
 const checkExistingUser = async (req, res, next) => {
    try {
      const userFound = await User.findOne({ username: req.body.username });
      if (userFound)
        return res.status(400).json({ message: "The user already exists :o!" });
  
      const email = await User.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "The email already exists :o!" });
  
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
 const checkExistingRole = (req, res, next) => {
    //req.body.roles;
    //if (!req.body.roles) return res.status(400).json({ message: "No roles" });
  if(req.body.roles){
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!roles.includes(req.body.roles)) {
        return res.status(400).json({
          message: `Role ${req.body.roles} does not exist :o!`,
        });
      }
    }
  }

    next();
  };

module.exports = {
    checkExistingUser,
    checkExistingRole 
}