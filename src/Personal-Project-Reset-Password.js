let email = document.querySelector(".email");
email.addEventListener("change", validEmail);
let emailIndex = 0;
let password = document.querySelector(".password");
let difIndex = 0;
let conPass = document.querySelector(".conPassword");
conPass.addEventListener("keyup", addenter);
conPass.addEventListener("change", confirmPassword);
let conIndex = 0;
let passAlert = document.querySelector(".passAlert");
let emailAlert = document.querySelector(".emailAlert");
let resetBtn = document.querySelector(".resetBtn");
let loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

function addenter(event) {
  if (event.key === "Enter") {
    reset();
  }
}

resetBtn.addEventListener("click", reset);

function reset() {
  if (loginInfo.Email !== null) {
    if (
      email.value !== "" &&
      password.value !== "" &&
      conPass.value !== "" &&
      emailIndex === 1 &&
      conIndex === 1
    ) {
      if (password.value !== loginInfo.Password) {
        let newInfo = {
          Email: loginInfo.Email,
          Username: loginInfo.Username,
          Password: password.value,
        };
        localStorage.setItem("loginInfo", JSON.stringify(newInfo));
        location.href = "Personal-Project-Home.html";
      } else {
        alert("Please enter a new password");
      }
    } else {
      alert("Please enter all the required information");
    }
  }
}

function validEmail() {
  if (email.value !== loginInfo.Email) {
    emailAlert.style.display = "block";
  } else {
    emailIndex = 1;
    emailAlert.style.display = "none";
  }
}

function confirmPassword() {
  if (password.value !== conPass.value) {
    passAlert.style.display = "block";
  } else {
    conIndex = 1;
    passAlert.style.display = "none";
  }
}
