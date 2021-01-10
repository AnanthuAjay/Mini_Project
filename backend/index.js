const express = require("express"); // imports express module
const app = express(); // initializes the express variable
const cors = require("cors"); // imports the cors module to get rid of cross-origin error
const { Client } = require("pg"); //  imports the pg module for postgres database manipulation

var createEventTable =
  "CREATE TABLE IF NOT EXISTS Organize(event_id INTEGER GENERATED ALWAYS AS IDENTITY,name VARCHAR(200) NOT NULL,heading VARCHAR(500) NOT NULL,description VARCHAR(2000) NOT NULL,fees INTEGER,capacity INTEGER,venue VARCHAR(2000) NOT NULL , time_from VARCHAR(50)  NOT NULL,time_till VARCHAR(50),date VARCHAR(50),contact INTEGER NOT NULL,email VARCHAR(200) NOT NULL,PRIMARY KEY(event_id));";
var createRegisterTable =
  "CREATE TABLE IF NOT EXISTS Registrations (studentID INTEGER GENERATED ALWAYS AS IDENTITY,eventID INTEGER NOT NULL,name VARCHAR(200) NOT NULL,email VARCHAR(200) NOT NULL,number INTEGER NOT NULL,semester INTEGER NOT NULL,PRIMARY KEY(studentID));";

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

app.post("/home/upload", (req, res) => {
  if (req.files) {
    console.log(req.files);
  }
});

//server call to conduct POST request at home/events
// used to register an event
app.post("/home/events", (req, res) => {
  CreateTable(createEventTable);
  checkEventStatus(
    req.body.venue,
    req.body.time_from,
    req.body.date,
    status => {
      if (status) {
        databaseUpload(getInsertingQuery(req.body, "organize"));
        res.send("Event Succesfully Registered");
      } else {
        res.send("Event cannot be registered due to clash !!");
      }
    }
  );
});

//fucntion to create a table
var CreateTable = query => {
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(res);
  });
};

//Server call to conduct POST request at home/registration
//used for registering a student for an event
app.post("/home/Registration", (req, res) => {
  CreateTable(createRegisterTable);
  databaseUpload(getInsertingQuery(req.body, "registrations"));
  res.send("Regsiterd");
});

//Server call to conduct GET reuques from home page..
//used for geting all the events registerd in the database and update in the homepage
app.get("/home", (req, res) => {
  console.log("home called");
  databaseRetrieve(getSelectQuery(), data => {
    res.send(data);
  });
});

// function used to insert data into database..
let databaseUpload = query => {
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("Successfull uploaded to database");
  });
};

// function to check if the event clashes with any of the other events
// the venue , time and date are given as parameters and a callback to return the value
// it compares the parameters with the values retrieved from the databse..

let checkEventStatus = (venue, time, date, callback) => {
  var status = true;

  console.log(venue, time, date);
  databaseRetrieve(getSelectQuery(), data => {
    data.forEach(element => {
      if (
        element.venue === venue &&
        element.time_from === time &&
        element.date === date
      ) {
        status = false;
        return;
      }
    });
    return callback(status);
  });
};

//function to retrieve data from the database and return it through callback using a query
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

//function to generate query to insert values to a table .
//parameters are the values and their key in JSON , the table name where it is to be inserted
let getInsertingQuery = (values, tablename) => {
  let valueArray = Object.values(values); //Array which stores all the values

  let keyArray = Object.keys(values); // Array which stores all the keys

  var insertQuery = "INSERT INTO " + tablename + " (";
  var valuesQuery = "VALUES (";

  for (let i = 0; i < keyArray.length - 1; i++) {
    //loop which iterates through both to array to generate a query string accordingly..
    insertQuery += keyArray[i] + (i == keyArray.length - 2 ? ")" : " , ");
    valuesQuery +=
      "'" + valueArray[i] + "'" + (i == valueArray.length - 2 ? ");" : " , ");
  }

  return insertQuery + " " + valuesQuery; // returns the final query.
};

let getSelectQuery = () => {
  var query = "SELECT * FROM organize";
  return query;
};

//Node server Start ...
app.listen(Port, () => {
  console.log("server running at " + Port);
});
