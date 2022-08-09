const { Router } = require("express");
const router = Router();
const ReviewSchema = require("../models/Reviews")

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
        res.json("Algo Malio Sal :O").status(404)
    }
})

//----------------PUT USER REVIEW------------------------
router.put("/", async (req, res) => {
    const { userRated, reviewer, qualification, comment } = req.body;
    try {
        if(!userRated, !reviewer, !qualification) {
            return res.json("te faltan datos pa")
        }
        const reviewPut = await ReviewSchema.findOneAndUpdate({userRated: userRated,reviewer: reviewer}, req.body);
        reviewPut.save()
        res.json("creo que malio siel");
    }
    catch (e) {
        res.json("Algo Malio Sal :O").status(404)
    }
})
//----------------DELETE USER REVIEW------------------------
router.delete("/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const reviewPut = await ReviewSchema.findByIdAndDelete(id);
        res.json("creo que malio siel");
    }
    catch (e) {
        res.json("Algo Malio Sal :O").status(404)
    }
})

module.exports = router;
