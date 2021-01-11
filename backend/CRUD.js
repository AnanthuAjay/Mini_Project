const { Client } = require("pg"); //  imports the pg module for postgres database manipulation

const client = new Client({
  // client variable with initialized database constrains
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "cusatbuzz"
});

client.connect();
var CreateTable = query => {
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};
// function used to insert data into database..
var databaseUpload = query => {
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("Successfull uploaded to database");
  });
};

//function to retrieve data from the database and return it through callback using a query
var databaseRetrieve = (query, callback) => {
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
//UPDATE operation to update reduce the capacity of an event whenever a registration happens
var updateCapacity = id => {
  let query =
    "UPDATE event SET capacity = capacity -1 WHERE event_id = " + id + ";";

  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }

    console.log("capacity successfull reduced");
  });
};
//function to get the capacity of an event
var getCapacity = (id, callback) => {
  let query = "SELECT capacity FROM event WHERE event_id = " + id + ";";

  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }
    return callback(res.rows[0].capacity);
  });
};
//DELETE operation to remove events whose hosting capacity is 0
var RemoveEvent = () => {
  let query = "DELETE FROM event WHERE capacity = 0";
  client.query(query, (err, res) => {
    if (err) {
      console.log(err);
    }

    console.log("event deleted");
  });
};

module.exports = {
  client,
  CreateTable,
  databaseUpload,
  databaseRetrieve,
  updateCapacity,
  getCapacity,
  RemoveEvent
};
