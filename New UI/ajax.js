var url = "http://127.0.0.1:4001/home";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

myHeaders.append("Access-Control-Allow-Origin", url + "/events");

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));

var formValue = {};
var form = document.getElementById("organizer-form");
var inputs = form.querySelectorAll("input");

form.addEventListener("submit", () => {
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
