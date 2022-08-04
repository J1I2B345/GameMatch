const { Router } = require("express");
const router = Router();
const UserSchema = require("../models/Users2.js");
const mongoose = require("mongoose")

//*----------------GET ALL USER------------------------

//solicitud Tipo GET: localhost:3001/users

router.get("/", async (req, res) => {
  const { username } = req.query;
  const conditionReviews = {
    $lookup:
    {
      from: "reviews",
      localField: "username",
      foreignField: "userRated",
      as: "reviews"
    }
  }
  const conditionGivenReviews = {
    $lookup:
    {
      from: "reviews",
      localField: "username",
      foreignField: "reviewer",
      as: "givenReviews"
    }
  }
  try {
    if(username) {
      const a = await UserSchema.aggregate(
      [
        conditionReviews,
        conditionGivenReviews,
        {
          $match: {
            username: username
          }
        }
      ]
      )
      if (a[0].reviews.length === 0) {
        a[0].rating = "Sin calificar"
      }
      if (a[0].reviews.length > 1) {
        let num = a[0].reviews.map(e => e.qualification)
        a[0].rating = num.reduce((a, b) => a + b) / a[0].reviews.length
      }
      if (a[0].reviews.length === 1) {
        a[0].rating = a[0].reviews[0].qualification
      }
      res.json(a)
    ;} else {
      const a = await UserSchema.aggregate(
        [
          conditionReviews,
          conditionGivenReviews
        ]
        )
        a.map(el => {
          if (el.reviews.length === 0) {
            el.rating = "Sin calificar"
          }
          if (el.reviews.length > 1) {
            let num = el.reviews.map(e => e.qualification)
            el.rating = num.reduce((a, b) => a + b) / el.reviews.length
          }
          if (el.reviews.length === 1) {
            el.rating = el.reviews[0].qualification
          }
        })
        res.json(a)
    }

  } catch (error) {
    console.log(error);
    console.log("Error trying to get user");
  }
});
//*----------------GET USER DETAIL------------------------

//solicitud Tipo GET: localhost:3001/users/ID

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const conditionReviews = {
    $lookup:
    {
      from: "reviews",
      localField: "username",
      foreignField: "userRated",
      as: "reviews"
    }
  }
  const conditionGivenReviews = {
    $lookup:
    {
      from: "reviews",
      localField: "username",
      foreignField: "reviewer",
      as: "givenReviews"
    }
  }
  try {
    const a = await UserSchema.aggregate(
      [
        conditionReviews,
        conditionGivenReviews,
        {
          $match: {
            _id: mongoose.Types.ObjectId(id)
          }
        }
      ]
    )

    // let num = a[0].reviews.map(e => e.qualification)
    // a[0].rating = num.reduce((a,b) => a + b) / a[0].reviews.length
    if (a[0].reviews.length === 0) {
      a[0].rating = "Sin calificar"
    }
    if (a[0].reviews.length === 1) {
      a[0].rating = a[0].reviews[0].qualification
    }
    if (a[0].reviews.length > 1) {
      let num = a[0].reviews.map(e => e.qualification)
      a[0].rating = num.reduce((a, b) => a + b) / a[0].reviews.length
    }
    res.json(a)
  }
  catch (e) {
    console.log("aaaaaaaaaaaa", e)
  }

});
//*----------------POST USER------------------------

//solicitud Tipo POST: localhost:3001/users


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

//solicitud Tipo POST: localhost:3001/users

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

let exampleUPDATE = {
  "username": "MichiGordo",
  "email": "userMishuno@gmail.com",
  "password": "exellentYpezcado",
  "img": "https://img.itch.zone/aW1nLzQyMTg3MTcuanBn/original/AfGtkn.jpg",
  "rating": "5",
  "description": "un michi gamer",
  "steam": "zXunMichuGamerXz",
  "riot": "zXunMichuGamerXz",
  "premium": true
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
