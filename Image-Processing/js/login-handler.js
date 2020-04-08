const userNameLogin = document.querySelector("#userNameLogin");
const userNameNextBtn = document.querySelector(
  ".userNamePhase .buttonField input"
);
const objectSelectionPhase = document.querySelector(".objectSelectionPhase");
const objectSelectionCancelBtn = document.querySelector(
  ".objectSelectionPhase .cancelButton"
);
const objectSelectionNextBtn = document.querySelector(
  ".objectSelectionPhase .nextButton"
);
const objectSelectorArray = document.querySelectorAll(
  ".objectSelectionPhase .image-content div"
);

var userNameValid = false;
var objectSelectionValid = false;
var userNameInputValue = "";

function ValidateUserName(userProfiles) {
  if (userProfiles != "empty-file") {
    var profileData = JSON.parse(userProfiles);
    profileData.forEach(element => {
      if (element.User_Name == userNameLogin.value) {
        userNameValid = true;
		  }
    });
  }
}

function ValidatePassword(profileDataRaw) {
  let valid = true;
  let profileData = JSON.parse(profileDataRaw);
  if (userNameValid) {
    profileData.forEach(obElement => {
      if (userNameLogin.value == obElement.User_Name) {
        objectSelectorArray.forEach(divElement => {
          if (
            obElement.Password.some(row => row.includes(divElement.className))
          ) {
            obElement.Password.forEach(pwd => {
              if (pwd[0] == divElement.className) {
                if (pwd[1] != parseInt(divElement.getAttribute("clickCount"))) {
                  valid = false;
                }
              }
            });
          } else {
            if (parseInt(divElement.getAttribute("clickCount")) != 0) {
              valid = false;
            }
          }
        });
      }
    });
    if (valid) {
      ShowAlert("Authetication Successful");
      ResetForm();
    } else {
      ShowAlert("Authentication Error!<br>Objects don't match!");
      ResetForm();
    }
  } else {
    ShowAlert("UserAuthentication Error!<br>Name Invalid!");
    ResetForm();
  }
}

function SetObject(objectCoordinatesData) {
  objectCoordinates = JSON.parse(objectCoordinatesData);
  objectCoordinates.forEach(obElement => {
    objectSelectorArray.forEach(divElement => {
      if (divElement.className == obElement.name) {
        divElement.style.left = obElement.x;
        divElement.style.top = obElement.y;
        divElement.style.height = obElement.height;
        divElement.style.width = obElement.width;
      }
    });
  });
}

function ResetForm() {
  document.querySelector(".login-dialogue form").reset();
  objectSelectorArray.forEach(divElement => {
    divElement.setAttribute("clickCount", "0");
  });
  userNameValid = false;
  objectSelectionValid = false;
  objectSelectionPhase.classList.add("hidePhase");
}

function InitObjects() {
  objectSelectorArray.forEach(divElement => {
    divElement.setAttribute("clickCount", "0");
    divElement.addEventListener("click", e => {
      let clicks = parseInt(divElement.getAttribute("clickCount"));
      clicks += 1;
      divElement.setAttribute("clickCount", clicks.toString());
      console.log(
        divElement.className + ":" + divElement.getAttribute("clickCount")
      );
    });
  });
}

InitObjects();

userNameNextBtn.addEventListener("click", e => {
  ShowAlert("Please click on the suitable images for appropriate no. of times. After completion click on Next ",e=>{
    MakeAJAXCall(
    "php/read-file.php",
    ValidateUserName,
    "../database/user-profiles.json"
    );
  objectSelectionPhase.classList.remove("hidePhase");
  MakeAJAXCall(
    "php/read-file.php",
    SetObject,
    "../database/object-selection-data.json"
   );
  });
});


objectSelectionCancelBtn.addEventListener("click", e => {
  objectSelectionPhase.classList.add("hidePhase");
});

objectSelectionNextBtn.addEventListener("click", e => {
  MakeAJAXCall(
    "php/read-file.php",
    ValidatePassword,
    "../database/user-profiles.json"
  );
});
