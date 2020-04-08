const alertBox = document.querySelector(".alertBox");
const alertBoxMsg = document.querySelector(".alertBox p");
const alertBoxBtn = document.querySelector(".alertBoxBtn");
let callback=null;

function ShowAlert(alertMsg, _callback=null) {
  alertBox.classList.add("showBox");
  alertBoxMsg.innerHTML = alertMsg;
  callback=_callback;
}

alertBoxBtn.addEventListener("click", e => {
  document.querySelector(".alertBox").classList.remove("showBox");
  if(callback)
    callback();
});
