const { Router } = require("express");
const router = Router();
const ReviewSchema = require("../models/Reviews")
const UserSchema = require("../models/Users")

//----------------POST USER REVIEW------------------------
router.post("/", async (req, res) => {
    const { userRated, reviewer, qualification, comment } = req.body;
    try {
        if(!userRated, !reviewer, !qualification) {
            return res.json("te faltan datos pa")
        }
        const reviewPost = await ReviewSchema(req.body);
        reviewPost.save()
        res.json("creo que malio siel");
    }
    catch (e) {
        console.log(e)
        res.json("Algo Malio Sal :O").status(404)
    }
})


module.exports = router;