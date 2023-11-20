const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Member must include a name field"],
	},
	occupation: {
		type: String,
		required: [true, "Member must include an occupation field"],
	},
	age: {
		type: Number,
		required: [true, "Member must include an age field"],
	},
	is_online: Boolean,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// create a model based on the schema defined above

const memberModel = new mongoose.model("Member", memberSchema);

module.exports = memberModel;
