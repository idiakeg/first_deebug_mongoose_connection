const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");
const memberModel = require("./model_definition");

// ============to get all the users present in the database
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

// ============to add a member
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

		/*count = createdMember.length;  You cannot obtain the length of the entire array from here because the createdMember is an object the describes the particular user that was just created. The best place to obtain count is from the "/all_members" route as it access the entire memeberModel collection which is an array of members and hence the length can therefore be obtained */

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

// ============ to update a member
router.put("/edit/:id", async (req, res) => {
	const { name, age, occupation, is_online } = req.body;
	const { id } = req.params;

	// check if the client provided an id in their request
	if (!id) {
		// so long as the id provided is seen as valid by mongoose, i.e it matches the requiredbut
		return res.status(400).send({
			status: "error",
			msg: "Please enter an id",
		});
	}
	try {
		// check id the user with the provided id exists in the DB
		const userToBeUpdated = await memberModel.findByIdAndUpdate(
			{
				_id: id,
			},
			{
				name,
				age,
				occupation,
				is_online,
				updatedAt: new Date().toLocaleString(),
			},
			{ new: true }
		);

		// the code above returns null if no user with the specified id can be found

		if (!userToBeUpdated) {
			return res.status(400).send({
				status: "error",
				msg: `User with id: ${id} does not exist`,
			});
		}

		res.status(200).send({
			status: "ok",
			update: userToBeUpdated,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: "error",
			msg: error.message,
		});
	}
});

// ======delete a member
router.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).send({
			status: "error",
			msg: "Provide the id of the member you'd like to delete",
		});
	}
	try {
		const memberToBeDeleted = await memberModel.findByIdAndDelete({
			_id: id,
		});

		if (!memberToBeDeleted) {
			return res.status(400).send({
				status: "error",
				msg: "user with provided id does not exist on the database",
			});
		}

		res.status(200).send({
			status: "ok",
			msg: "User deleted successfully",
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			msg: error.message,
		});
	}
});

// ==============get single user
router.get("/single_member/:id", async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).send({
			status: "error",
			msg: "Provide an id",
		});
	}

	try {
		const singleMember = await memberModel.findById({
			_id: id,
		});

		if (!singleMember) {
			return res.status(400).send({
				status: "error",
				msg: "No user with the provided id",
			});
		}

		res.send({
			status: "ok",
			msg: singleMember,
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			msg: error.message,
		});
	}
});

module.exports = router;
