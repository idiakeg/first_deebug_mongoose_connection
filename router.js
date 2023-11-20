const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const memberModel = require("./model_definition");

// to get all the users present in the database
router.get("/all_members", async (req, res) => {
	let msg = "success";
	try {
		const allMembers = await memberModel.find({});
		if (!allMembers || allMembers.length === 0) {
			msg = "There are no members";
		}
		let count = allMembers.length;
		res.status(200).send({
			msg,
			count,
			members: allMembers,
		});
	} catch (error) {
		return res.status(500).json({
			msg: "something went wrong",
		});
	}
});

// to add a member
router.post("/add", async (req, res) => {
	// obtain the required fields from the request body
	const { name, age, occupation } = req.body;
	try {
		// if this if statement, the validation error message specified in the schema kicks in
		if (!name || !age || !occupation) {
			return res.status(400).send({
				status: "error",
				msg: "ALl fields must be entered",
			});
		}
		const createdMember = await memberModel.create({
			name,
			age,
			occupation,
		}); /* The create method returns a promise that resolves into the document or array of documents  */

		count =
			createdMember.length; /* You cannot obtain the length of the entire array from here because the createdMember is an object the describes the particular user that was just created. The best place to obtain count is from the "/all_members" route as it access the entire memeberModel collection which is an array of members and hence the length can therefore be obtained */
		console.log(count);

		res.status(200).send({
			status: "ok",
			msg: "success",
			members: createdMember,
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			msg: error.message,
		});
	}
});
module.exports = router;
