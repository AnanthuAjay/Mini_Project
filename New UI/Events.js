var eventContainer = document.querySelector(".card-container");
var ImagePath = "";

var DisplayEvents = data => {
  data.forEach(event => {
    var eventCard = document.createElement("div");
    eventCard.setAttribute("class", "event-card");

    var eventImage = document.createElement("img");
    eventImage.setAttribute("id", "event-image");
    eventImage.setAttribute("alt", "Event Image");
    eventImage.setAttribute("src", event.imagepath);

    var eventHeading = document.createElement("h1");
    eventHeading.setAttribute("id", "event-heading");

    var eventDescription = document.createElement("p");
    eventDescription.setAttribute("id", "event-description");

    var eventVenue = document.createElement("h3");
    eventVenue.setAttribute("id", "event-venue");

    var timeContainer = document.createElement("div");
    timeContainer.setAttribute("class", "event-time");

    var time_from = document.createElement("span");
    time_from.setAttribute("id", "event-time-from");

    var hyphen = document.createElement("span");
    hyphen.textContent = " - ";

    var time_till = document.createElement("span");
    time_till.setAttribute("id", "event-time-till");

    var dateContainer = document.createElement("div");
    dateContainer.setAttribute("class", "event-date");

    var date = document.createElement("span");
    date.setAttribute("id", "event-date");

    var fees = document.createElement("span");
    fees.setAttribute("id", "event-fees");

    var rupees = document.createElement("span");
    rupees.textContent = "\u20B9";

    var apply = document.createElement("button");
    apply.textContent = "seats left : ";

    var capacity = document.createElement("span");
    capacity.setAttribute("id", "event-capacity");
    capacity.style.color = "white";
    capacity.style.fontSize = "20px";

    apply.setAttribute("value", event.event_id);
    apply.setAttribute("onclick", "eventRegister(this.value)");

    eventHeading.textContent = event.heading;
    eventDescription.textContent = event.description;
    eventVenue.textContent = event.venue;
    time_from.textContent = event.time_from;
    time_till.textContent = event.time_till;
    date.textContent = event.date;
    fees.textContent = event.fees;
    capacity.textContent = event.capacity;

    apply.appendChild(capacity);
    dateContainer.appendChild(date);
    dateContainer.appendChild(rupees);
    dateContainer.appendChild(fees);
    timeContainer.appendChild(time_from);
    timeContainer.appendChild(hyphen);
    timeContainer.appendChild(time_till);
    eventCard.appendChild(eventImage);
    eventCard.appendChild(eventHeading);
    eventCard.appendChild(eventDescription);
    eventCard.appendChild(eventVenue);
    eventCard.appendChild(timeContainer);
    eventCard.appendChild(dateContainer);
    eventCard.appendChild(apply);
    eventContainer.appendChild(eventCard);
  });
};

var EventID = 0;
const modal = document.getElementById("modalOne");
let eventRegister = value => {
  modal.style.display = "block";
  EventID = value;
};

var RegistrationFormData = {};
var RegistrationForm = modal.querySelector("form");
var RegistrationFormInputs = RegistrationForm.querySelectorAll("input");
var register = document.querySelector("#register");

register.addEventListener("click", () => {
  document.getElementById("modal-venue").value = document.getElementById(
    "modal-venues"
  ).value;
  RegistrationFormData["event_id"] = EventID;
  RegistrationFormInputs.forEach(input => {
    console.log(input.name);
    RegistrationFormData[input.name] = input.value;
  });

  console.log(RegistrationFormData);

  const body2 = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    body: JSON.stringify(RegistrationFormData)
  };

  const request2 = new Request(url + "/Registration", body2);

  fetch(request2)
    .then(response => response.text())
    .then(data => {
      window.alert(data);
    });
});
