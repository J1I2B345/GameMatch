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
	try {
		const users = await UserSchema.find();
		if (users) res.json(users);
		else throw new Error("no users in the DB");
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

//*----------------GET USER DETAIL------------------------
//*----------------GET BY NAME ------------------------
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const userFound = await UserSchema.findById(id);
		if (userFound) return res.status(200).json(userFound);
		else throw new Error("user not found");
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//*----------------GET USER BY NAME ------------------------
router.get("/username/:username", async (req, res) => {
	try {
		const username = req.params.username?.trim();
		const userFound = await UserSchema.aggregate([
			{
				$lookup: {
					from: "roles",
					localField: "roles",
					foreignField: "_id",
					as: "RolesString",
				},
			},
			{
				$match: {
					username: username,
				},
			},
		]);
		if (userFound) return res.status(200).json(userFound);
		else throw new Error("user not found");
	} catch (error) {
		console.log("Error trying to get the user");
		res.status(500).json({ error: error.message });
	}
});

//solicitud Tipo GET: localhost:3001/users/ID

//*----------------POST USER-----|Register|-------------------

//solicitud Tipo POST: localhost:3001/users/register

router.post(
	"/register",
	[verify.checkExistingRole, 
		verify.checkExistingUser],
	async (req, res) => {
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
			ban,
		} = req.body;

		try {
			//  const createdUser = await UserSchema.create(user);

			const alredyCreated = await UserSchema.find({ email });
			//: await UserSchema.encryptPassword(password)
			const newUser = new UserSchema({
				email: email?.trim().toLowerCase(),
				password: password?.trim(),
				username: username?.trim(),
				rating,
				chats,
				reviews,
				img,
				description,
				roles,
				socialNetworks,
				ban,
			});

			if (roles) {
				//** "admin" or ["Admin, Moderator"] */
				const foundRoles = await Role.find({ name: { $in: roles } });
				newUser.roles = foundRoles.map((role) => role._id);
			} else {
				const role = await Role.findOne({ name: "User" });
				newUser.roles = [role._id];
			}
			const savedUser = await newUser.save();

			console.log("Created User: " + newUser.username);

			/*JSON WEB TOKEN <- sign permite crear el token*/
			// jwt.sign({dato guardado en el token}, "palabra secreta",{objeto configuraicon})

			//const token = jwt.sign({ id: savedUser._id }, CONFIG.SECRET, {
		//		expiresIn: 86400, // 24 hours
		//	});

			//if (savedUser)  return res.status(200).json({ token });
			if (savedUser) return res.status(200).json(savedUser);
			//*CON ESTO EVIO AL FRONT TODO ME PIDEN LOS DATOS POR ESTE TOKEN
			else throw new Error("This user has already been created. Login!");
		} catch (error) {
			console.log("Error trying to create user");

			res.status(500).json({ error: error.message });
		}
	}
);

// let examplePOST = {
//   "username":"Common User ",
//   "email":"common.user@gmail.com",
//   "password":"claveComun",
//   "img":"https://cdn.onlinewebfonts.com/svg/img_574041.png",
//   "description":"Soy un jugador experto en jungla mi main es..",
// }
// let examplePOST2 = {
//   "username":"John",
//   "email":"jhon.theBestAdmin@gmail.com",
//   "password":"claveAdmin",
//   "img":"https://i.pinimg.com/originals/94/09/7e/94097e458fbb22184941be57aaab2c8f.png",
//   "description":"Soy un buen administrador, experto en farme World of warcraft y me gusta pescar",
//      "roles":"Admin"
// }

//*----------------POST USER-----|Login|-------------------

//solicitud Tipo POST: localhost:3001/users/login

router.post("/login", async (req, res) => {
	try {
		req.body.email = req.body.email?.trim().toLowerCase();
		req.body.password = req.body.password?.toString();
		const userFound = await UserSchema.findOne({
			email: req.body.email,
		}).populate("roles");
		if (!userFound) return res.status(400).json({ message: "User not found" });

		const pass = await UserSchema.findOne({email: req.body.email, password: req.body.password})

		if (!pass)
		return res.status(401).json({
		  token: null,
		  message: "Invalid Password",
		});
		// si cohincide la contraseña
		// const token = jwt.sign({ id: userFound._id }, CONFIG.SECRET, {
		// 	expiresIn: 86400, // 24 hs
		// });
		//res.json({ token }).status(201);
		res.json(userFound).status(201);
	} catch (error) {
		console.log("Error trying to sigIn");

		res.status(500).json({ error: error.message });
	}
});

//*----------------UPDATE USER------------------------

//auth.isAdmin,solicitud Tipo POST: localhost:3001/users
//[auth.verifyToken,auth.isAdmin]
router.put("/:id", async (req, res) => {
	try {
		req.body.username = req.body.username?.trim();
		req.body.email = req.body.email?.trim();
		if (req.body.roles) {
			const foundRoles = await Role.find({ name: { $in: req.body.roles } });
			req.body.roles = foundRoles.map((role) => role._id);
		}
		const userUpdate = await UserSchema.findByIdAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
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
router.delete("/:id",
// auth.isAdmin,
  async (req, res) => {
	try {
		const user = await UserSchema.findByIdAndDelete(req.params.id);
		console.log("DELETED  :" + user.username);
		res.json(user).status(200);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
