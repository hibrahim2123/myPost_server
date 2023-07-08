const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
dotenv.config({
  path: "./config/.env",
});
app.use(cors());
app.use(express.json());

app.use("/api", routes);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongoose is connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
