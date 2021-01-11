const express = require("express"); // imports express module
const app = express(); // initializes the express variable
const cors = require("cors"); // imports the cors module to get rid of cross-origin error
const { Client } = require("pg"); //  imports the pg module for postgres database manipulation
const multer = require("multer");
const upload = multer({
  dest: "/uploads/"
});

const client = new Client({
  // client variable with initialized database constrains
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "cusatbuzz"
});

client.connect();
app.use(cors());
app.use(express.json());
const Port = process.env.Port || 4001;

app.listen(Port, () => {
  console.log("server running at " + Port);
});
