"use-strict";
const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoute = require("./routes/auth");
const carRoute = require("./routes/car");

const PORT = process.env.PORT || 5005;

dotenv.config();

const url = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};
connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/car", carRoute);
app.get('/',(req,res)=>{
  res.json("hello")
})

app.listen(PORT, () => {
  console.log("Backend server is running!");
});
