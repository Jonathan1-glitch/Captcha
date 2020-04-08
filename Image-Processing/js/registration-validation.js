const resetBtn = document.querySelector("#clearBtn");
const registerBtn = document.querySelector("#registerBtn");

function ResetRegForm() {
  document.querySelector(".registration-dialogue form").reset();
  ResetDropDown();
  ResetClicks();
}

function AJAX_POST_Registration() {
  var _userName = document.getElementById("userNameInput");
  var _userNameValue = _userName.value.trim();
  var _backgroundSelect = document.getElementById("backgroundSelectInput");
  var _backgroundSelectOptions =
    _backgroundSelect[_backgroundSelect.selectedIndex].value;
  var _backgroundSize = document.querySelector(
    "input[name='backgroundSize']:checked"
  ).value;
  var _noiseAmount = document.querySelector("input[name='noiseSize']:checked")
    .value;
  var objectList = new Array();

  dropDownOptions.forEach((element, index) => {
    objectList[index] = [element.innerHTML, element.getAttribute("clickCount")];
  });

  var _paramListRaw = [
    {
      User_Name: _userNameValue,
      Background: _backgroundSelectOptions,
      Background_Size: _backgroundSize,
      Password: objectList,
      Noise: _noiseAmount
    }
  ];

  var _paramList = JSON.stringify(_paramListRaw, null, 1);

  SetAJAXPostCall("php/register.php", ShowAlert, _paramList);
}

function ValidateRegistrationForm(profileData) {
  var _userName = document.getElementById("userNameInput");
  var _backgroundSelect = document.getElementById("backgroundSelectInput");
  var validateMsg = "";
  var validateErrors = false;
  var _userNameValue = _userName.value.trim();
  _userName.value = _userNameValue;

  if (_userNameValue == "") {
    validateMsg += "User Name cannot be empty.<br>";
    validateErrors = true;
  } else if (_userNameValue.length <= 3) {
    validateMsg += "User Name should be more than 3 letters.<br>";
    validateErrors = true;
  } else {
    if (profileData != "empty-file") {
      let userProfileData = JSON.parse(profileData);
      userProfileData.forEach(element => {
        if (element.User_Name == _userNameValue) {
          validateErrors = true;
          validateMsg += "User Name already exists!<br>";
        }
      });
    }
  }

  if (_backgroundSelect.selectedIndex == -1) {
    validateMsg += "Please select a Background.<br>";
    validateErrors = true;
  }

  if (itemsClicked.length < 3) {
    validateMsg += "Please select atleast 3 Objects from drop-down.";
    validateErrors = true;
  }

  if (validateErrors == true) {
    ShowAlert(validateMsg);
  } else {
    AJAX_POST_Registration();
    ResetRegForm();
  }
}

resetBtn.addEventListener("click", e => {
  if (confirm("Reset Form Data?")) {
    ResetRegForm();
  }
});

registerBtn.addEventListener("click", e => {
  if (confirm("Submit Form Data?")) {
    MakeAJAXCall("php/read-file.php", ValidateRegistrationForm);
  }
});
