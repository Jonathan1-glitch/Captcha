const loginForm = document.querySelector(".login-dialogue");
const formOverlay = document.querySelector(".form-overlay");
const loginSliderbtn = document.querySelector(".loginSliderBtn");
const regSliderbtn = document.querySelector(".registrationSliderBtn");
const loginSlider = document.querySelector(".loginSlider");
const regSlider = document.querySelector(".registrationSlider");

// 0 for login and 1 for registration
var hiddenForm = 0;

loginSliderbtn.addEventListener("click", e => {
  loginSlider.classList.add("overlayDisabled");
  regSlider.classList.remove("overlayDisabled");
  formOverlay.classList.add("slideLeft");
  ResetRegForm();
});

regSliderbtn.addEventListener("click", e => {
  loginSlider.classList.remove("overlayDisabled");
  regSlider.classList.add("overlayDisabled");
  formOverlay.classList.remove("slideLeft");
});
