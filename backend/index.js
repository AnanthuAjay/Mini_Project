const express = require("express"); // imports express module
const app = express(); // initializes the express variable
const cors = require("cors"); // imports the cors module to get rid of cross-origin error
const crud = require("./CRUD.js");
const qr = require("./queries.js");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    let extension = file.originalname.match("\\.(jpeg|png|jpg)")[0];
    cb(null, ImageName.toString() + extension);
  }
});

const upload = multer({ storage: storage });

var ImageName = "";

app.use(cors());
app.use(express.json());
const Port = process.env.Port || 4001;

app.post("/home/upload", upload.single("eventImage"), (req, res) => {});

app.post("/home/events", (req, res) => {
  crud.CreateTable(qr.createEventTable);
  ImageName = req.body.event_id;
  checkEventStatus(
    req.body.venue,
    req.body.time_from,
    req.body.date,
    status => {
      if (status) {
        crud.databaseUpload(qr.getInsertingQuery(req.body, "event"));
        res.send("Event Succesfully Registered");
      } else {
        res.send("Event cannot be registered due to clash !!");
      }
    }
  );
});

//Server call to conduct POST request at home/registration
//used for registering a student for an event
app.post("/home/Registration", (req, res) => {
  crud.CreateTable(qr.createRegisterTable);
  crud.databaseUpload(qr.getInsertingQuery(req.body, "registrations"));
  crud.updateCapacity(req.body.event_id);
  var response = {};

  crud.getCapacity(req.body.event_id, capacity => {
    response["capacity"] = capacity;
  });

  response["response"] = "Successfull registered";

  console.log(req.body);
});

//Server call to conduct GET reuques from home page..
//used for geting all the events registerd in the database and update in the homepage
app.get("/home", (req, res) => {
  crud.RemoveEvent();
  crud.databaseRetrieve(qr.getSelectQuery(), data => {
    res.send(data);
  });
});

// function to check if the event clashes with any of the other events
// the venue , time and date are given as parameters and a callback to return the value
// it compares the parameters with the values retrievconst multer = require("multer");

let checkEventStatus = (venue, time, date, callback) => {
  var status = true;

  console.log(venue, time, date);
  crud.databaseRetrieve(qr.getSelectQuery(), data => {
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

//Node server Start ...
app.listen(Port, () => {
  console.log("server running at " + Port);
});
