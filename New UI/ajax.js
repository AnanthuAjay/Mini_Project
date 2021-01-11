var url = "http://127.0.0.1:4001/home";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

myHeaders.append("Access-Control-Allow-Origin", url + "/events");

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    DisplayEvents(data);
  });

const eventsTable = document.getElementById("events-table-body");
var venue_input = document.getElementById("venue");
var description_input = document.getElementById("description");

var formValue = {};
var form = document.getElementById("organizer-form");
var inputs = form.querySelectorAll("input");
var submit = document.getElementById("event-submit");
var imageForm = document.getElementById("image-form");
var image = document.getElementById("eventImage");

submit.addEventListener("click", event => {
  event.preventDefault();

  var EventId = Math.ceil(Math.random() * 1000 + 1);
  venue_input.value = document.getElementById("venues").value;
  formValue["event_id"] = EventId;
  description_input.value = document.getElementById("descriptions").value;

  if (image.value != null) {
    formValue["imagePath"] =
      "../backend/uploads/" +
      EventId +
      image.value.match("\\.(jpeg|png|jpg)")[0];
  }
  inputs.forEach(input => {
    formValue[input.name] = input.value;
  });

  const body = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    body: JSON.stringify(formValue)
  };

  const request = new Request(url + "/events", body);
  fetch(request)
    .then(response => response.text())
    .then(text => {
      imageForm.submit();
      window.alert(text);
    });
});
