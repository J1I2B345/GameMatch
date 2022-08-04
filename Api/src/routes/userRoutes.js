const { Router } = require("express");
const router = Router();
const UserSchema = require("../models/Users2.js");

//*----------------GET ALL USER------------------------

//solicitud Tipo GET: localhost:3001/user

router.get("/", async (req, res) => {
  const { username } = req.query;
  try {
    if (username) {
      UserSchema.find({ username: username }).then((user) =>
        res.json(user).status(200)
      );
    } else {
      UserSchema.find().then((user) => {
        res.json(user).status(200);
      });
    }
  } catch (error) {
    console.log(error);
    console.log("Error trying to get user");
  }
});
//*----------------GET USER DETAIL------------------------

//solicitud Tipo GET: localhost:3001/user/ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {  
    UserSchema.findById(id)
    .then((user) => {res.status(200).json(user)})
    .catch(error => {res.status(400).json(error.message)})
  } catch (error) {
    res.status(400).json(error);
    console.log("Error trying to get user");
  }
});
//*----------------POST USER------------------------

//solicitud Tipo POST: localhost:3001/user


// router.post("/", (req, res) => {
//   const {
//     username,
//     email,
//     password,
//     img,
//     rating,
//     rol,
//     reviews,
//     givenReviews,
//     description,
//     steam,
//     riot,
//     ig,
//     tenant,
//     connection,
//   } = req.body;
//   try {
//     const user = UserSchema({
//       username,
//       email,
//       password,
//       img,
//       rating,
//       rol,
//       reviews,
//       givenReviews,
//       description,
//       steam,
//       riot,
//       ig,
      
//       tenant,
//       connection,
//     });
//     user;
//     user
//       .save()
//       .then((data) => res.json(data))
//       .status(201);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await UserSchema.create(user)
    console.log("usuario ya creado: ", createdUser) 
    if (createdUser) return res.status(201).json(createdUser) 
    else throw new Error('user not created')
  } catch (error) {
    res.status(400).json(error.message);
  }
});

let examplePOST = {
  username: "Michi",
  email: "userMishuno@gmail.com",
  password: "exellentYpezcado",
  img: "https://img.itch.zone/aW1nLzQyMTg3MTcuanBn/original/AfGtkn.jpg",
  rating: 5,
  description: "un michi gamer",
  steam: "zXunMichuGamerXz",
  riot: "zXunMichuGamerXz",
};
//*----------------UPDATE USER------------------------

//solicitud Tipo POST: localhost:3001/user

router.put("/:id", async (req, res) => {
  try {
    UserSchema.findOneAndUpdate({ _id: req.params.id }, req.body).then(
      function (userUpdate) {
        UserSchema.findOne({ _id: req.params.id }).then(function (userUpdate) {
          res.send(userUpdate);
        });
      }
    );
  } catch (error) {
    console.log(error);
    console.log("error trying to update user");
  }
});

let exampleUPDATE={
  "username":"MichiGordo",
  "email":"userMishuno@gmail.com",
  "password":"exellentYpezcado",
  "img":"https://img.itch.zone/aW1nLzQyMTg3MTcuanBn/original/AfGtkn.jpg",
  "rating":"5",
  "description":"un michi gamer",
  "steam":"zXunMichuGamerXz",
  "riot":"zXunMichuGamerXz",
  "premium":true
}

//*----------------DELETE USER------------------------

//solicitud Tipo DELETE: localhost:3001/user/ID

router.delete("/:id", async (req, res) => {
  try {
    UserSchema.findOneAndDelete({ _id: req.params.id }).then(function (user) {
      res.json(user).status(200);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while deleting user" });
  }
});

module.exports = router;
