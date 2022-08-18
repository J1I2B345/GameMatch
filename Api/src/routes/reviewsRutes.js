const { Router } = require("express");
const router = Router();
const ReviewSchema = require("../models/Reviews");
const UserSchema = require("../models/Users.js");

//----------------GET REVIEWS----------------------------
//by paramas /:id

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
			a[0].rating = "Unrated";
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

//by query ?username=

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
				a[0].rating = "Unrated";
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
					el.rating = "Unrated";
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

//----------------POST USER REVIEW------------------------
router.post("/", async (req, res) => {
	const { userRated, reviewer, qualification, comment } = req.body;
	try {
		if ((!userRated, !reviewer, !qualification)) {
			return res.json("missing data");
		}
		const reviewPost = await ReviewSchema(req.body);
		reviewPost.save();
		res.json("was saved successfully");
	} catch (e) {
		res.json("something went wrong").status(404);
	}
});

//----------------PUT USER REVIEW------------------------
router.put("/", async (req, res) => {
	const { userRated, reviewer, qualification, comment } = req.body;
	try {
		if ((!userRated, !reviewer, !qualification)) {
			return res.json("te faltan datos pa");
		}
		const reviewPut = await ReviewSchema.findOneAndUpdate(
			{ userRated: userRated, reviewer: reviewer },
			req.body
		);
		reviewPut.save();
		res.json("was saved successfully");
	} catch (e) {
		res.json("something went wrong").status(404);
	}
});
//----------------DELETE USER REVIEW------------------------
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const reviewPut = await ReviewSchema.findByIdAndDelete(id);
		res.json("successfully removed");
	} catch (e) {
		res.json("something went wrong").status(404);
	}
});

module.exports = router;
