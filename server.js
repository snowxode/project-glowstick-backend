require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true } );
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to MongoDB"));

// Accept JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes
const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(3000, () => console.log("Server is running..."));