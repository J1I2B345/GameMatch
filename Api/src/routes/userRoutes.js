const { Router } = require("express");
const router = Router();
const UserSchema = require("../models/Users.js");
const mongoose = require("mongoose");
const CONFIG = require("../config.js");

//*authentication methods
const jwt = require("jsonwebtoken");
const Role = require("../models/Role.js");
const auth = require("../middlewares/auth");
const verify = require("../middlewares/verifyLogin");

//*----------------GET ALL USER------------------------

//solicitud Tipo GET: localhost:3001/users

router.get("/", async (req, res) => {
  const { username } = req.query;
  const conditionReviews = {
    $lookup: {
      from: "reviews",
      localField: "username",
      foreignField: "userRated",
      as: "reviews",
    },
  };
  const conditionGivenReviews = {
    $lookup: {
      from: "reviews",
      localField: "username",
      foreignField: "reviewer",
      as: "givenReviews",
    },
  };
  try {

    if (username) {
      const a = await UserSchema.aggregate([
        conditionReviews,
        conditionGivenReviews,
        {
          $match: {
            username: username,
          },
        },
      ]);
      if (a[0].reviews.length === 0) {
        a[0].rating = "Sin calificar";
      }
      if (a[0].reviews.length > 1) {
        let num = a[0].reviews.map((e) => e.qualification);
        a[0].rating = num.reduce((a, b) => a + b) / a[0].reviews.length;
      }
      if (a[0].reviews.length === 1) {
        a[0].rating = a[0].reviews[0].qualification;
      }
      res.json(a);
    } else {
      const a = await UserSchema.aggregate([
        conditionReviews,
        conditionGivenReviews,
      ]);
      a.map((el) => {
        if (el.reviews.length === 0) {
          el.rating = "Sin calificar";
        }
        if (el.reviews.length > 1) {
          let num = el.reviews.map((e) => e.qualification);
          el.rating = num.reduce((a, b) => a + b) / el.reviews.length;
        }
        if (el.reviews.length === 1) {
          el.rating = el.reviews[0].qualification;
        }
      });
      res.json(a);
    }
  } catch (error) {
    console.log("Error trying to get users");
    res.status(400).send({ error: error.message });
  }
});
//*----------------GET USER DETAIL------------------------

//solicitud Tipo GET: localhost:3001/users/ID

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const conditionReviews = {
    $lookup: {
      from: "reviews",
      localField: "username",
      foreignField: "userRated",
      as: "reviews",
    },
  };
  const conditionGivenReviews = {
    $lookup: {
      from: "reviews",
      localField: "username",
      foreignField: "reviewer",
      as: "givenReviews",
    },
  };
  try {
    
    const a = await UserSchema.aggregate([
      conditionReviews,
      conditionGivenReviews,
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
    ]);

    // let num = a[0].reviews.map(e => e.qualification)
    // a[0].rating = num.reduce((a,b) => a + b) / a[0].reviews.length
    if (a[0].reviews.length === 0) {
      a[0].rating = "Sin calificar";
    }
    if (a[0].reviews.length === 1) {
      a[0].rating = a[0].reviews[0].qualification;
    }
    if (a[0].reviews.length > 1) {
      let num = a[0].reviews.map((e) => e.qualification);
      a[0].rating = num.reduce((a, b) => a + b) / a[0].reviews.length;
    }
    res.json(a);
  } catch (error) {
    console.log("Error trying to get user detail");
    res.status(500).json({ error: error.message });
  }
});
//*----------------POST USER-----|Register|-------------------

//solicitud Tipo POST: localhost:3001/users/register

router.post("/register",[verify.checkExistingRole,verify.checkExistingUser], async (req, res) => {
  const {
    email,
    password,
    username,
    rating,
    roles,
    chats,
    reviews,
    img,
    description,
    socialNetworks,
    ban
  } = req.body;

  try {

    //  const createdUser = await UserSchema.create(user);

    const alredyCreated = await UserSchema.find({ email });
//: await UserSchema.encryptPassword(password)
    const newUser = new UserSchema({
      email:email?.trim(),
      password:password?.trim(),
      username:username?.trim(),
      rating,
      chats,
      reviews,
      img,
      description,
      roles,
      socialNetworks,
      ban
    });

    if (roles) {
      //** "admin" or ["Admin, Moderator"] */
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "User" });
      newUser.roles = [role._id];
    }
    const savedUser = await newUser.save()

    console.log("Created User: " + newUser.username);

    /*JSON WEB TOKEN <- sign permite crear el token*/
    // jwt.sign({dato guardado en el token}, "palabra secreta",{objeto configuraicon})

 
    const token = jwt.sign({ id: savedUser._id }, CONFIG.SECRET, {
      expiresIn: 86400, // 24 hours
    });

   
    if (savedUser)  return res.status(200).json({ token });
    //*CON ESTO EVIO AL FRONT TODO ME PIDEN LOS DATOS POR ESTE TOKEN
    else throw new Error("This user has already been created. Login!");

  } catch (error) {
    console.log("Error trying to create user");

    res.status(500).json({ error: error.message });
  }
});

// let examplePOST = {
//   "username":"Common User ",
//   "email":"common.user@gmail.com",
//   "password":"claveComun",
//   "img":"https://cdn.onlinewebfonts.com/svg/img_574041.png",
//   "description":"Soy un jugador experto en jungla mi main es..",
//   "steam":"Common",
//   "riot":"CommonS2",
//   "ig":"@CommonJungle",
//     "epicgames":"@CommonS2"

// }
// let examplePOST2 = {
//   "username":"John",
//   "email":"jhon.theBestAdmin@gmail.com",
//   "password":"claveAdmin",
//   "img":"https://i.pinimg.com/originals/94/09/7e/94097e458fbb22184941be57aaab2c8f.png",
//   "description":"Soy un buen administrador, experto en farme World of warcraft y me gusta pescar",
//   "steam":"JhonnyFisher",
//   "riot":"JhonnyTheBestFisher",
//   "ig":"@JhonnyFisher",
//     "epicgames":"Jhonny.Fisher"
//      "roles":"Admin"
// }

//*----------------POST USER-----|Login|-------------------

//solicitud Tipo POST: localhost:3001/users/login

router.post("/login", async (req, res) => {

  try {
    const tok = req.headers["authorization"];

    req.body.email=req.body.email?.trim()
    req.body.password=req.body.password?.trim()
    const userFound = await UserSchema.findOne({ email: req.body.email }).populate(
      "roles"
    );
   if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await UserSchema.comparePassword(
      req.body.password,
      userFound.password
    );
      if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });
   // si cohincide la contraseña 
    const token = jwt.sign({ id: userFound._id },CONFIG.SECRET, {
      expiresIn: 86400, // 24 hs
    });
    res.json({ token }).status(201);
  } catch (error) {
    console.log("Error trying to sigIn");

    res.status(500).json({ error: error.message });
  }
});

//*----------------UPDATE USER------------------------

//solicitud Tipo POST: localhost:3001/users
//[auth.verifyToken,auth.isAdmin]
router.put("/:id",auth.isAdmin, async (req, res) => {
  try {

    req.body.username = req.body.username?.trim()
    req.body.email=req.body.email?.trim()
    const userUpdate = await UserSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body, 
      {new:true}
    );
    console.log("UPDATE :" + userUpdate.username);
    res.status(200).json(userUpdate);
  } catch (error) {
    console.log("Error trying to update a user");
    res.status(500).json({ error: error.message });
  }
});

// let examplePOST = {
//   "username":"Michus Obesos",
//   "email":"michiobeso@gmail.com",
//   "password":"exellentYpezcado",
//   "img":"https://img.itch.zone/aW1nLzQyMTg3MTcuanBn/original/AfGtkn.jpg",
//   "description":"dos michis gamer",
//   "steam":"zXun2uGamerXz",
//   "riot":"zXu2huGamerXz"

// };
//*----------------DELETE USER------------------------

//solicitud Tipo DELETE: localhost:3001/users/ID
//[auth.verifyToken,auth.isAdmin]
router.delete("/:id",auth.isAdmin, async (req, res) => {
  try {
    const user = await UserSchema.findByIdAndDelete(req.params.id);
    console.log("DELETED  :" + user.username);
    res.json(user).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


//*----------------GET BY NAME ------------------------
router.get("/username/:username", async (req, res) => {
  try {
    const username = req.params.username?.trim();
    const userFound = await UserSchema.findOne({username: username});
    if (userFound) return res.status(200).json(userFound);
    else throw new Error("user not found");
  } catch (error) {
    console.log("Error trying to get the user");
    res.status(500).json({ error: error.message });
  }
});





module.exports = router;
