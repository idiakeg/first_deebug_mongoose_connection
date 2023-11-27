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
	is_online: {
		type: Boolean,
		default: true,
	},
	createdAt: {
		type: String,
		default: () => new Date().toLocaleString(),
	},
	updatedAt: {
		type: String,
	},
	is_deleted: {type: Boolean, default: false}
}, {collection: "members"});

// create a model based on the schema defined above

const memberModel = new mongoose.model("Member", memberSchema);

module.exports = memberModel;
