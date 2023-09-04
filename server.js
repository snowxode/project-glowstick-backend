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

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

// TODO:  Write routes for other pages here
// They will be imported like the above
// Inside the front-end you can make requsts for data in the ngInit method of the component/on request

const recipeRouter = require("./routes/recipes");
app.use("/recipes", recipeRouter);


app.listen(3000, () => console.log("Server is running..."));

