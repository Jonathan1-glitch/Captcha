const loginPhase1 = document.querySelector(".login-phase-1");
const registrationDialogue = document.querySelector(".registration-dialogue");

function PlayAnimation(element, animation) {
  element.style.animation = animation;
}

function PlayLoginEntry() {
  let animation = "revealPhase 1s ease-in-out forwards";
  PlayAnimation(loginPhase1, animation);
}

function PlayRegistrationEntry() {
  let animation = "revealPhase 1s ease-in-out forwards";
  PlayAnimation(registrationDialogue, animation);
}

function PlayRegistrationExit() {
  let animation = "hidePhase 1s ease-in-out forwards";
  PlayAnimation(registrationDialogue, animation);
}
