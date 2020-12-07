var path_empty =
  '<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"/><path fill-rule="evenodd" d = "M8 1.918l-.797.161A4.00 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />';
var path_fill =
  '<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>';
var notifi_icon_status = false;
var noti_box = document.querySelector(".noti-box");
if (getNoOfEvents() == 0) {
  document.querySelector(".bell").innerHTML = path_empty;
  noti_box.style.height = "fit-content";
  noti_box.style.pointerEvents = "none";
} else {
  document.querySelector(".bell").innerHTML = path_fill;
}
document.querySelector(".noti-button").addEventListener("click", collapse);
document.querySelector(".badge").textContent = getNoOfEvents();
function collapse() {
  if (notifi_icon_status) {
    noti_box.style.display = "none";
    notifi_icon_status = false;
  } else {
    noti_box.style.display = "block";
    notifi_icon_status = true;
  }
}

function getNoOfEvents() {
  return document.getElementsByClassName("event-panel").length;
}
