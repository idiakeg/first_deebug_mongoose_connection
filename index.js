// set up server
const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 6666;
const memberRouter = require("./router");

// set up connection to the local mongoDB
const connectDB = require("./connect_db");
connectDB();

//middleware definitons
app.use(express.json());
app.use("/members", memberRouter);

// listen for the server on a defined port
app.listen(port, () => console.log(`server is running on port: ${port}`));
