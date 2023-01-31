const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const userRoute = require("../routes/users");
const pinRoute = require("../routes/pins");
app.use(express.json());

app.use(cors());

mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((error) => console.log(error));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(process.env.API_PORT, () => {
  console.log("server is running");
});

module.exports = app;
