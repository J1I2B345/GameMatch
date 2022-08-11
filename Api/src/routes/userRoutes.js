const { Router } = require("express");
const router = Router();
const UserSchema = require("../models/Users.js");
const mongoose = require("mongoose");

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
//*----------------POST USER------------------------

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    user.username = user.username.trim()
    const createdUser = await UserSchema.create(user);
    console.log("Created User: " + createdUser.username);
    if (createdUser) return res.status(201).json(createdUser);
    else throw new Error("user not created");
  } catch (error) {
    console.log("Error trying to post a user");
    res.status(500).json({ error: error.message });
  }
});

// let examplePOST = {
//   "username":"Michus Gordos",
//   "email":"user2o@gmail.com",
//   "password":"exellentYpezcado",
//   "img":"https://img.itch.zone/aW1nLzQyMTg3MTcuanBn/original/AfGtkn.jpg",

//   "description":"dos michis gamer",
//   "steam":"zXun2uGamerXz",
//   "riot":"zXu2huGamerXz"

// };
//*----------------UPDATE USER------------------------

//solicitud Tipo POST: localhost:3001/users

router.put("/:id", async (req, res) => {
  try {
    const userUpdate = await UserSchema.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("UPDATE :" + userUpdate.username);
    res.status(201).json(userUpdate);
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

router.delete("/:id", async (req, res) => {
  try {

    const user = await UserSchema.findOneAndDelete(req.params.id);
    console.log('DELETED  :' +user.username);
    res.json(user).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/username/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const userFound = await UserSchema.findOne({username: username});
    if (userFound) return res.status(200).json(userFound);
    else throw new Error("user not found");
  } catch (error) {
    console.log("Error trying to get the user");
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
