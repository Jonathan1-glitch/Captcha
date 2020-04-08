const objectDropDownBtn = document.querySelector("#objectDropDown");
const dropDownOptions = document.querySelectorAll(
  ".objectSelectorContent span"
);

var itemsClicked = new Array();
var itemsAlertMsg = "";

function UpdateAlertMessage(replacementStr, indexStr, prevLength) {
  prevLength += " times.<br>".length;
  return (
    itemsAlertMsg.substr(0, indexStr) +
    replacementStr +
    " times.<br>" +
    itemsAlertMsg.substr(indexStr + prevLength)
  );
}

function ResetClicks() {
  itemsAlertMsg = "";
  itemsClicked.length = 0;
  dropDownOptions.forEach(option => {
    option.setAttribute("clickCount", "0");
  });
}

function ResetDropDown() {
  const dropDownList = document.querySelectorAll(
    ".registration-dialogue select"
  );
  dropDownList.forEach(element => {
    element.selectedIndex = -1;
  });
}

ResetDropDown();

objectDropDownBtn.addEventListener("click", e => {
  document
    .querySelector(".objectSelectorContent")
    .classList.toggle("showContent");
});

window.onclick = e => {
  if (!e.target.matches("#objectDropDown")) {
    document
      .querySelector(".objectSelectorContent")
      .classList.remove("showContent");
  }
};

dropDownOptions.forEach(option => {
  option.setAttribute("clickCount", "0");
  option.addEventListener("click", e => {
    var clickCount = parseInt(option.getAttribute("clickCount"));
    clickCount++;
    option.setAttribute("clickCount", clickCount.toString());
    if (!itemsClicked.includes(option)) {
      itemsClicked.push(option);
      itemsAlertMsg +=
        "You clicked " + option.innerHTML + " " + clickCount + " time.<br>";
    } else {
      let prevStrLength = (option.innerHTML + " " + (clickCount - 1).toString())
        .length;
      let newStr = option.innerHTML + " " + clickCount.toString();
      let startIndex = itemsAlertMsg.indexOf(option.innerHTML);
      itemsAlertMsg = UpdateAlertMessage(newStr, startIndex, prevStrLength);
    }
    ShowAlert(itemsAlertMsg);
    console.log(itemsAlertMsg);
  });
});
