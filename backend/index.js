const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((error) => console.log(error));

app.listen(3009, () => {
  console.log("server is running");
});
