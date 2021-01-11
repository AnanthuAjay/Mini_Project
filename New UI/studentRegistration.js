let DisplayEvents = data => {
  data.forEach(event => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML =
      '<button style=" background-color: #fc0b03;width: 10vw;height: 5vh;color: white; border: none ; outline: none; border-radius: 5px;" data-modal="modalOne" type="submit" value="' +
      event.event_id +
      '" class="apply-button">Apply</button>';
    let tds = document.createElement("td");
    console.log(event.heading);
    tds.textContent = event.heading;

    eventsTable.appendChild(tr);
    tr.appendChild(tds);
    tr.appendChild(td);
  });
  console.log(eventsTable);
};

const modal = document.getElementById("modalOne");
var eventID = 0;
eventsTable.addEventListener("click", e => {
  if ((e.target.className = "apply-button")) {
    modal.style.display = "block";
    EventID = e.target.value;
  }
});

var RegistrationFormData = {};
var RegistrationForm = modal.querySelector("form");
var RegistrationFormInputs = RegistrationForm.querySelectorAll("input");

RegistrationForm.addEventListener("submit", () => {
  event.preventDefault();

  document.getElementById("modal-venue").value = document.getElementById(
    "modal-venues"
  ).value;
  RegistrationFormData["eventID"] = EventID;
  RegistrationFormInputs.forEach(input => {
    RegistrationFormData[input.name] = input.value;
  });
});
