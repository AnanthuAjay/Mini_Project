var url = "http://127.0.0.1:4001/home";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

myHeaders.append("Access-Control-Allow-Origin", url + "/events");
fetch(url)
  .then(response => response.json())
  .then(data => {
    DisplayEvents(data);
  });

const eventsTable = document.getElementById("events-table-body");
let DisplayEvents = data => {
  data.forEach(event => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML =
      '<button style=" background-color: #fc0b03;width: 10vw; height: 5vh;" data-modal="modalOne" type="submit" value="' +
      event.event_id +
      '" class="apply-button"></button>';
    let tds = document.createElement("td");
    tds.textContent = event.heading;

    eventsTable.appendChild(tr);
    tr.appendChild(tds);
    tr.appendChild(td);
  });
};
eventsTable.addEventListener("click", e => {
  if ((e.target.className = "apply-button")) {
    document.getElementById("modalOne").style.display = "block";
  }
});
var venue_input = document.getElementById("venue");
var description_input = document.getElementById("description");

var formValue = {};
var form = document.getElementById("organizer-form");
var inputs = form.querySelectorAll("input");

form.addEventListener("submit", event => {
  event.preventDefault();
  venue_input.value = document.getElementById("venues").value;
  description_input.value = document.getElementById("descriptions").value;

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
      window.alert(text);
    });
});
