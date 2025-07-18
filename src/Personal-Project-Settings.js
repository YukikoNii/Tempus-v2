function save() {
  // get the index of the textbox that is focused
  let sIndex = Array.prototype.indexOf.call(saveBtns, this);
  // check if the email is in the correct format
  let emailIndex = 0;
  let expression =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (accTexts[1].value.match(expression)) {
    emailIndex = 1;
  } else {
    emailIndex = 0;
  }
  if (accTexts[sIndex].value !== "") {
    if (emailIndex === 1) {
      this.style.display = "none";
      cancelBtns[sIndex].style.display = "none";
      accBtns[sIndex].style.display = "block";
      accTexts[sIndex].disabled = true;
      accTexts[sIndex].style.border = "1px solid #525252";
      accAlerts[sIndex].style.display = "none";
      window.localStorage.setItem(
        accTexts[sIndex].name,
        accTexts[sIndex].value
      );
      userName.innerHTML =
        accTexts[0].value + '&nbsp;<span id="arrow">&#9660;</span>';
      let newInfo = {
        Username: accTexts[0].value,
        Email: accTexts[1].value,
        Password: accTexts[2].value,
      };

      window.localStorage.setItem("loginInfo", JSON.stringify(newInfo));
    } else {
      alert("email is invalid");
      accTexts[sIndex].style.border = "1px solid #c43d3d";
    }
  } else {
    accAlerts[sIndex].style.display = "block"; // show alert message that username can't be blank. (just like acctexts, I think I have to use an index for this.)
    accTexts[sIndex].style.border = "1px solid #c43d3d";
  }
}

// delete account
function deleteAcc() {
  window.localStorage.clear();
  location.replace("Personal-Project-Landing-Page.html");
}

function deleteCon() {
  delModal.style.display = "block";
}

// menu show and hide
setBtns = document.querySelectorAll(".settingMenu > span");
bodies = document.querySelectorAll(".body");
for (var i = 0; i < setBtns.length; i++) {
  setBtns[i].addEventListener("click", menuChange);
}

function menuChange(i) {
  let mIndex = Array.prototype.indexOf.call(setBtns, this);
  for (var i = 0; i < bodies.length; i++) {
    bodies[i].style.display = "none";
  }
  bodies[mIndex].style.display = "grid";
}

// sound play on select
let sDropDown = document.querySelector(".alSound");
let script = document.querySelector(".script");
let body = document.querySelector("body");
let options = document.querySelectorAll("option");
let audioArr = [];

sDropDown.addEventListener("change", function () {
  let audioObj = new Audio(sDropDown.value);
  audioArr.push(sDropDown.value);
  let selected = sDropDown.options[sDropDown.selectedIndex];
  let mIndex = Array.prototype.indexOf.call(options, selected);
  audioArr.push(mIndex);
  body.insertBefore(audioObj, script);
  audioObj.play();
});

let alBtn = document.querySelector(".alBtn");
alBtn.addEventListener("click", function () {
  localStorage.setItem("audioObj", JSON.stringify(audioArr));
  alBtn.value = "saved"; // <- maybe implement this
  const alTimeout = setTimeout(changeBack, 1000);
  function changeBack() {
    alBtn.value = "save";
  }
});
