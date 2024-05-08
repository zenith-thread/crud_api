const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Databse Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello from crup api" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});