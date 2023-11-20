const mongoose = require("mongoose");
const port = process.env.PORT || 6666;
require("dotenv").config();

// define a connctDB function
const connecDB = () => {
	mongoose
		.connect(process.env.MONGO_URI_LOCAL)
		.catch((error) =>
			console.log(`DB Connection error: ${JSON.stringify(error)}`)
		);
	const con = mongoose.connection;
	// handle error when opening db
	con.on("open", (error) => {
		if (!error) console.log("DB Connection Successful");
		else console.log(`Error Connecting to DB: ${JSON.stringify(error)}`);
	});

	con.on("disconnected", (error) => {
		console.log(`Mongoose lost connection with MongoDB:`);
		console.log(error);
	});
};

module.exports = connecDB;
