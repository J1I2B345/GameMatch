const { Router } = require("express");
const router = Router();
const ReportUsers = require("../models/ReportUsers.js");
const UserSchema = require("../models/Users.js");
//*----------------GET GAMES------------------------


router.get("/all", async (req, res) => {
	try {
        let reportedUser = await ReportUsers.find()
		res.json(reportedUser);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const report = await ReportUsers.findById(req.params.id);
		if ( report ) return res.json(report);
		else throw new Error("Report not found")
	}catch (error) {
		res.status(400).send({ error: error.message });
	}
})

router.post("/", async (req, res) => {
	const { author, title, description, reportedUser } = req.body;
	try {
	  const report = new ReportUsers({
		author,
		title,
		description,
		reportedUser,
	  });
	  const saveReport = await report.save();
	  if (report) res.status(201).json(saveReport);
	} catch (error) {
	  res.status(400).send({ error: error.message });
	}
  });

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deleteReport = await ReportUsers.findByIdAndDelete(id);
		res.json("successfully removed");
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
})
module.exports = router;