/*
Icon Bar
*/

let menu = document.getElementsByClassName("menu")[0];
menu.addEventListener("click", collapse);

let shrink = 0;

let menutexts = document.querySelectorAll(".icon");

let gridcolumn = document.querySelector(".grid");

let iconImg = document.getElementsByClassName("sideimg");

// icon bar change the width
function collapse() {
  if (shrink === 0) {
    let iconbar = document.getElementById("iconbar");
    iconbar.style.width = "34%";
    iconbar.style.minWidth = "5em";
    iconImg[0].src = "images/Hamburger Menu2.png";
    for (let i = 0; i < menutexts.length; i++) {
      menutexts[i].style.display = "none";
      gridcolumn.style.gridTemplateColumns = "0.29fr 4fr 1fr";
    }
    shrink = 1;
  } else {
    document.getElementById("iconbar").style.width = "100%";
    iconbar.style.minWidth = "15em";
    iconImg[0].src = "images/Hamburger Menu.png";
    for (let i = 0; i < menutexts.length; i++) {
      menutexts[i].style.display = "block";
      gridcolumn.style.gridTemplateColumns = "1fr 4fr 1fr";
    }
    shrink = 0;
  }
}

function mediaQuery(scSize) {
  if (scSize.matches) {
    shrink = 0;
    collapse();
  } else {
    shrink = 1;
    collapse();
  }
}

var scSize = window.matchMedia("(max-width: 1000px)");

mediaQuery(scSize);
scSize.addListener(mediaQuery);

/*
User info
*/

window.addEventListener("click", dropdown);
let userName = document.getElementById("username");
let userIcon = document.getElementById("usericon");
let dropMenu = document.querySelector(".dropDown");
let dropContent = document.querySelector(".dropDownContent");
// user menu drop down
function dropdown(event) {
  let arrow = document.getElementById("arrow");
  if (
    event.target === userIcon ||
    event.target === userName ||
    event.target === arrow
  ) {
    if (dropMenu.style.display === "block") {
      dropMenu.style.display = "none";
      dropContent.style.display = "none";
      arrow.innerHTML = "&#9660;";
    } else {
      dropMenu.style.display = "block";
      dropContent.style.display = "block";
      arrow.innerHTML = "&#9650;";
    }
  }
  if (event.target === dropMenu) {
    dropMenu.style.display = "none";
    dropContent.style.display = "none";
    arrow.innerHTML = "&#9660;";
  }
}
// setting username
let getInfo = JSON.parse(window.localStorage.getItem("loginInfo"));
let newName;
if (getInfo !== null) {
  newName = getInfo.Username;
}

window.addEventListener("load", function () {
  userName.innerHTML = newName + '&nbsp;<span id="arrow">&#9660;</span>';
});
// logout

document.querySelector(".logout").addEventListener("click", logout);

function logout() {
  location.replace("Personal-Project-Landing-Page.html");
}

document.querySelector(".settings").addEventListener("click", setting);

function setting() {
  location.replace("Personal-Project-Settings.html");
}

// logo link to homepage
document.querySelector(".logo").addEventListener("click", function () {
  location.href = "Personal-Project-Home.html";
});

// user icon
usericon.src = "images/undraw_male_avatar_323b.svg";
if (localStorage.getItem("fileSrc") !== null) {
  usericon.src = localStorage.getItem("fileSrc");
}
