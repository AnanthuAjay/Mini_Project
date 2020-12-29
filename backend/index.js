const express = require("express");
const app = express();
const cors = require("cors");
const { Client } = require("pg");

const client = new Client({
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

app.post("/home/events", (req, res) => {
  console.log(databaseUpload(getInsertingQuery(req.body)));
  res.send();
});

app.get("/home", (req, res) => {
  databaseRetrieve(getSelectQuery(), data => {
    res.send(data);
  });
});

let databaseUpload = query => {
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("Successfull uploaded to database");
    client.end();
  });
};

let databaseRetrieve = (query, callback) => {
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    var data = [];
    for (let row of res.rows) {
      data.push(row);
    }
    return callback(data);
  });
};

let getInsertingQuery = values => {
  let valueArray = Object.values(values);
  let keyArray = Object.keys(values);

  var insertQuery = "INSERT INTO organize (";
  var valuesQuery = "VALUES (";

  for (let i = 0; i < keyArray.length - 1; i++) {
    insertQuery += keyArray[i] + (i == keyArray.length - 2 ? ")" : " , ");
    valuesQuery +=
      "'" + valueArray[i] + "'" + (i == valueArray.length - 2 ? ");" : " , ");
  }

  return insertQuery + " " + valuesQuery;
};

let getSelectQuery = () => {
  var query = "SELECT * FROM organize WHERE name = 'saneen'";
  return query;
};

app.listen(Port, () => {
  console.log("server running at " + Port);
});