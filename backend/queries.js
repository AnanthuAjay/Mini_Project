let getSelectQuery = () => {
  var query = "SELECT * FROM event";
  return query;
};

//function to generate query to insert values to a table .
//parameters are the values and their key in JSON , the table name where it is to be inserted
let getInsertingQuery = (values, tablename) => {
  let valueArray = Object.values(values); //Array which stores all the values

  let keyArray = Object.keys(values); // Array which stores all the keys

  var insertQuery = "INSERT INTO " + tablename + " (";
  var valuesQuery = "VALUES (";

  for (let i = 0; i < keyArray.length; i++) {
    //loop which iterates through both to array to generate a query string accordingly..
    insertQuery += keyArray[i] + (i == keyArray.length - 1 ? ")" : " , ");
    valuesQuery +=
      "'" + valueArray[i] + "'" + (i == valueArray.length - 1 ? ");" : " , ");
  }
  return insertQuery + " " + valuesQuery; // returns the final query.
};

var createEventTable =
  "CREATE TABLE IF NOT EXISTS event(event_id INTEGER,imagePath VARCHAR(2000),name VARCHAR(200) NOT NULL,heading VARCHAR(500) NOT NULL,description VARCHAR(2000) NOT NULL,fees INTEGER,capacity INTEGER,venue VARCHAR(2000),time_from VARCHAR(50)  NOT NULL,time_till VARCHAR(50),date VARCHAR(50),contact BIGINT NOT NULL,email VARCHAR(200) NOT NULL,PRIMARY KEY(event_id));";
var createRegisterTable =
  "CREATE TABLE IF NOT EXISTS registrations (studentID INTEGER GENERATED ALWAYS AS IDENTITY,event_id INTEGER NOT NULL,name VARCHAR(200) NOT NULL,email VARCHAR(200) NOT NULL,number BIGINT NOT NULL,semester INTEGER NOT NULL, department VARCHAR(200) NOT NULL ,PRIMARY KEY(studentID));";

module.exports = {
  getSelectQuery,
  getInsertingQuery,
  createEventTable,
  createRegisterTable
};
