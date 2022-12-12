const express = require("express");

const app = express();

app.use(express.json());

const cors = require("cors");

app.use(cors());

const database = require("./database");

const BACKEND_PORT = process.env.BACKEND_PORT ?? 5005;

const articleRouter = require("./articles/articleRouter");

app.get("/", (req, res) => {
  let output = "";
  let error = false;

  database
    .getConnection()
    .then(() => {
      output += "Database connection working well.";
    })
    .catch((err) => {
      error = true;
      console.error(err);
      output += "Database connection malfunctioning.";
    })
    .finally(() => {
      if (error) {
        res.status(500).send(output);
      } else {
        res.status(200).send("Welcome to our API!" + output);
      }
    });
});

app.listen(BACKEND_PORT, () => {
  console.log("Listening on port", BACKEND_PORT);
});

app.use("/articles", articleRouter);
