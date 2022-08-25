const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const router = Router();
const ReviewSchema = require("../models/Reviews");
const UserSchema = require("../models/Users.js");

//----------------GET REVIEWS----------------------------
//by paramas /:id

router.get("/", async (req, res) => {
	const { username } = req.query;

	try {
		const reviews = await ReviewSchema.find({ userRated: username });
		res.status(200).json(reviews);
	} catch (error) {
		console.log("Error trying to get user detail");
		res.status(500).json({ error: error.message });
	}
});

//----------------POST USER REVIEW------------------------
router.post("/", async (req, res) => {
	const { userRated, reviewer, qualification } = req.body;
	try {
		if ((!userRated, !reviewer, !qualification)) {
			return res.json("te faltan datos pa");
		}
		const verifyReview = await ReviewSchema.findOne({
			userRated: userRated,
			reviewer: reviewer,
		});
		if (!verifyReview) {
			const rated = await ReviewSchema.find({ userRated: userRated });
			let suma = rated.map((el) => el.qualification);
			let sum = suma.length > 0 ? suma.reduce((a, b) => a + b) : 0;
			let rating = (sum + qualification) / (rated.length + 1);
			const user = await UserSchema.findByIdAndUpdate(userRated, { rating: rating });
			const reviewPost = await ReviewSchema(req.body);
			reviewPost.save();
			res.status(200).json(reviewPost);
		} else {
			const put = await ReviewSchema.findOneAndUpdate(
				{ userRated: userRated, reviewer: reviewer },
				{ qualification: qualification}
			);
			const rated = await ReviewSchema.find({ userRated: userRated });
			console.log(rated)
			let suma = rated.map((el) => el.qualification);
			let sum = suma.length > 0 ? suma.reduce((a, b) => a + b) : 0;
			let rating = sum / rated.length;
			const user = await UserSchema.findByIdAndUpdate(
				userRated,
				{ rating: rating }
			);
			put.qualification = qualification
			res.status(200).json(put);
		}
	} catch (e) {
		res.json("Algo Malio Sal :O").status(404);
	}
});
//----------------DELETE USER REVIEW------------------------
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const { userRated } = req.body;
	try {
		const reviewPut = await ReviewSchema.findByIdAndDelete(id);
		const rated = await ReviewSchema.find({ userRated: userRated });
		let suma = rated.map((el) => el.qualification);
		let sum = suma.length > 0 ? suma.reduce((a, b) => a + b) : 0;
		let rating = sum / rated.length;
		const user = await UserSchema.findOneAndUpdate(
			{ username: userRated },
			{ rating: rating }
		);
		res.status(200).json("creo que malio siel");
	} catch (e) {
		res.json("Algo Malio Sal :O").status(404);
	}
});

module.exports = router;
