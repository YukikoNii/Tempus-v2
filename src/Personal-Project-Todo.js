// modal
var modal = document.getElementById("todomodal");

// title
let titleinput = document.getElementById("titleinput");

// alert when title is empty
let no_title_alert = document.getElementById("no_title_alert");

// close button
var closebutton = document.getElementById("close");
closebutton.addEventListener("click", close);

function close() {
  modal.style.display = "none";
  no_title_alert.textContent = "*";
}

// creating tags
var tag_container = document.querySelector(".tag-box");

// what you type
var input = document.querySelector(".tag-box input");

// array for saving the tags
let tags = [];
for (var i = 0; i < tags.length; i++) {
  $("body").append('<div id="' + tags[i] + '">' + tags[i] + "</div>");
}

function createTag(label) {
  // create div
  let div = document.createElement("div");
  // class="tag"
  div.setAttribute("class", "tag");
  // span inside the div
  let span = document.createElement("span");
  span.innerHTML = label;
  // close button
  let closebutton = document.createElement("span");
  closebutton.setAttribute("class", "material-icons");
  closebutton.setAttribute("data-item", label);
  closebutton.innerHTML = "close";

  div.appendChild(span);
  div.appendChild(closebutton);
  return div;
}

// reset the tags so they don't pile up
function reset() {
  document.querySelectorAll(".tag").forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

// Create new tags
function addTags() {
  reset();
  tags
    .slice()
    .reverse()
    .forEach(function (tag) {
      let input = createTag(tag);
      // use prepend instead of append so that it comes to the front
      tag_container.prepend(input);
    });
}

// add tag on enter
input.addEventListener("keyup", enter);
input.addEventListener("keyup", delTag);

function enter(event) {
  // if Enter Key was pressed
  if (event.key === "Enter") {
    if (input.value != "") {
      if (input.value.includes(" ")) {
        alert("Tag name can't contain a space.");
      } else {
        tags.push(input.value);
        // add the tag to an array 'tag';
        input.value = "";
        addTags();
      }
    } else {
      save();
    }
  }
}

function delTag(event) {
  // if delete key was pressed
  if (event.key === "Backspace") {
    // if tag isn't empty
    if (tags.length !== 0) {
      /*WHAT??? */
      // get the name of the tag
      let targetTag = tags[tags.length - 1];
      //find the index of the tag
      let index = tags.indexOf(targetTag);
      // remove the tag from tag array
      tags = [...tags.splice(0, index), ...tags.slice(index + 1)];
      addTags();
    }
  }
}

document.addEventListener("click", removeTag);

function removeTag(event) {
  let element = event.target;
  // if span was clicked
  if (element.tagName === "SPAN") {
    // get the value of the tag
    let value = element.getAttribute("data-item");
    // find the index of the tag from the tag array
    let index = tags.indexOf(value);
    // remove the tag from the array
    tags = [...tags.splice(0, index), ...tags.slice(index + 1)];
    // add new tags
    addTags();
  }
}

// get tag-box input, event when on focus
document.querySelector(".tag-box input").addEventListener("focus", highlight);
// add event when out of focus
document.querySelector(".tag-box input").addEventListener("focusout", remhigh);
// box itself
let box = document.getElementById("tag-box");

// save button (add button at the bottom)
var savebutton = document.getElementById("save");
savebutton.addEventListener("click", save);

let lowIndex = 0;
let medIndex = 0;
let highIndex = 0;
let lowBtn = document.querySelector("#low");
let medBtn = document.querySelector("#medium");
let highBtn = document.querySelector("#high");
lowBtn.innerHTML = "Low <span>" + lowIndex + "</span>";
medBtn.innerHTML = "Medium <span>" + medIndex + "</span>";
highBtn.innerHTML = "High <span>" + highIndex + "</span>";

let liMes = document.createElement("span");
liMes.innerHTML = "There is no task at the moment.";
liMes.className = "liMes";
let list = document.querySelector("#list");

/*




SAVE FUNCTION BELOW





*/

let savedTags = [];
let allTags = [];

function save() {
  no_title_alert.textContent = "*";
  let entryList = document.getElementsByClassName("entry");
  let idArray = [];
  let idIndex = 0;
  for (var i = 0; i < entryList.length; i++) {
    idArray.push(entryList[i].id);
  }
  for (var i = 0; i < idArray.length; i++) {
    if (idArray[i] === titleinput.value) {
      idIndex = 1;
    }
  }

  if (idIndex === 0) {
    if (titleinput.value != "") {
      for (var i = 0; i < tags.length; i++) {
        allTags.push(tags[i]);
      }

      if (savedTags.length !== 0) {
        for (var i = 0; i < tags.length; i++) {
          if (savedTags.includes(tags[i]) !== true) {
            savedTags.push(tags[i]);
          }
        }
      } else {
        for (var i = 0; i < tags.length; i++) {
          savedTags.push(tags[i]);
        }
      }

      // create an entry
      let entry = document.createElement("div");
      // give it a class name
      entry.className = "entry";
      entry.setAttribute("id", titleinput.value);

      // create label named container
      let container = document.createElement("label");
      container.className = "container";
      entry.appendChild(container);

      //  create (default) checkbox, give a number to them
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkbox";
      checkbox.addEventListener("change", complete);
      checkbox.setAttribute("data-items", titleinput.value);
      container.appendChild(checkbox);

      // create a custom checkbox
      let checkmark = document.createElement("span");
      checkmark.className = "checkmark";
      container.insertBefore(checkmark, checkbox.nextSibling);

      // title
      let title = document.createElement("div");
      title.className = "entrytitle";
      title.id = titleinput.value;
      title.innerText = titleinput.value;
      title.addEventListener("click", expand);
      entry.appendChild(title);

      // Description
      let desinput = document.getElementById("desinput").value;
      let description = document.createElement("div");
      description.className = "entrydes";
      description.innerText = desinput;
      description.id = titleinput.value + "1";
      entry.insertBefore(description, titleinput.value.nextSibling);

      // date
      let dateinput = document.getElementById("date").value;
      let timeinput = document.getElementById("time").value;
      let date = document.createElement("div");
      if (toggleBool == true) {
        date.className = "entrydate due";
      } else {
        date.className = "entrydate";
      }
      date.id = titleinput.value + "2";
      date.innerText = "Due by: " + dateinput + " " + timeinput;
      if (dateinput !== "") {
        entry.append(date);
        date.style.display = "none";
      }

      // tags
      let tagEach = document.createElement("div");
      tagEach.className = "tagEach";
      tagEach.id = titleinput.value + "4";
      for (var i = 0; i < tags.length; i++) {
        tagEach.className += " " + tags[i];
      }
      entry.append(tagEach);
      tagEach.style.display = "none";

      // priority

      var select = document.getElementById("prchoice");
      var selectvalue = select.options[select.selectedIndex].text;
      let priority = document.createElement("div");
      priority.id = titleinput.value + "3";
      entry.append(priority);
      if (selectvalue === "Low") {
        entry.className += " prLowE";
        priority.className = "prlow";
        priority.innerHTML = "!";
      }
      if (selectvalue === "Medium") {
        entry.className += " prmedE";
        priority.className = "prmed";
        priority.innerHTML = "!!";
      }
      if (selectvalue === "High") {
        entry.className += " prhighE";
        priority.className = "prhigh";
        priority.innerHTML = "!!!";
      }

      if (entry.className === "entry prLowE") {
        lowIndex += 1;
        lowBtn.innerHTML = "Low <span>" + lowIndex + "</span>";
      }
      if (entry.className === "entry prmedE") {
        medIndex += 1;
        medBtn.innerHTML = "Medium <span>" + medIndex + "</span>";
      }
      if (entry.className === "entry prhighE") {
        highIndex += 1;
        highBtn.innerHTML = "High <span>" + highIndex + "</span>";
      }
      // add to DOM
      list.appendChild(entry);
      modal.style.display = "none";

      // reset the input
      document.getElementById("titleinput").value = "";
      document.getElementById("desinput").value = "";

      window.localStorage.setItem("savedTodo" + entry.id, entry.outerHTML);

      // check if there is any to-do
      if (list.contains(liMes) === true) {
        list.removeChild(liMes);
      }
    } else {
      const shake_animation = [
        { transform: "translate(0, 0)" },
        { transform: "translate(3px, 0px)" },
        { transform: "translate(0, 0)" },
        { transform: "translate(-3px, 0px)" },
        { transform: "translate(0, 0)" },
      ];

      const shake_timing = {
        duration: 100,
        iterations: 1,
      };

      todomodal.animate(shake_animation, shake_timing);
      no_title_alert.textContent = "* Please enter a title."; // apparently better than innerHTML as it is vulnerable when the next text is userinput. (so either way is fine in this case.)
      titleinput.style = "border:2px solid #C43D3D";
    }
  } else {
    alert("A task with the same name already exists");
    titleinput.style = "border:2px solid #C43D3D";
  }
}

/*



END OF SAVE FUNCTION



*/

titleinput.addEventListener("keyup", addenter);
prlabel.addEventListener("keyup", addenter);
time.addEventListener("keyup", addenter);
date.addEventListener("keyup", addenter);
var select = document.getElementById("prchoice");
select.addEventListener("keyup", addenter);

function addenter(event) {
  if (event.key === "Enter") {
    save();
  }
}

// remove on check
var checkbox = document.getElementsByClassName("checkbox");

function complete(event) {
  let chosenbox = event.target;
  let name = chosenbox.getAttribute("data-items");
  let todo = document.getElementById(name);
  if (todo.className === "entry prLowE") {
    lowIndex -= 1;
    lowBtn.innerHTML = "Low <span>" + lowIndex + "</span>";
  }
  if (todo.className === "entry prmedE") {
    medIndex -= 1;
    medBtn.innerHTML = "Medium <span>" + medIndex + "</span>";
  }
  if (todo.className === "entry prhighE") {
    highIndex -= 1;
    highBtn.innerHTML = "High <span>" + highIndex + "</span>";
  }
  if ((chosenbox.checked = true)) {
    if (list.childElementCount === 1) {
      setTimeout(function () {
        list.appendChild(liMes);
      }, 100);
    }
    window.localStorage.removeItem("savedTodo" + todo.id);
    todo.style.opacity = "0";
    setTimeout(function () {
      todo.remove();
    }, 200);

    //
    let unique = [];
    /*for (var i = 0; i < allTags.length; i++) {
      let val = allTags[i];
      let index = unique.indexOf(val);
      console.log(index);
      if (index !== -1) {
        unique.splice(index,1);
      } else {
          unique.push(val);
        }
      }*/
    const count = {};
    for (var element of allTags) {
      if (count[element]) {
        count[element] += 1;
      } else {
        count[element] = 1;
      }
    }

    for (var key in count) {
      if (count[key] === 1) {
        unique.push(key);
      }
    }

    let thisTag = document.getElementById(todo.id + "4").classList;
    let newUnique = [];
    for (var i = 0; i < thisTag.length; i++) {
      if (unique.includes(thisTag[i]) === true) {
        newUnique.push(thisTag[i]);
      }
    }

    for (var i = 0; i < thisTag.length; i++) {
      if (allTags.includes(thisTag[i]) === true) {
        let index = allTags.indexOf(thisTag[i]);
        allTags.splice(index, 1);
      }
      if (preTagArr.includes(newUnique[i]) === true) {
        let index = preTagArr.indexOf(newUnique[i]);
        preTagArr.splice(index, 1);
      }
    }

    for (var i = 0; i < newUnique.length; i++) {
      let index = savedTags.indexOf(newUnique[i]);
      savedTags.splice(index, 1);
    }
    let tagE = document.getElementsByClassName("tagE");
    tagEArr = Array.from(tagE);

    for (var i = 0; i < tagEArr.length; i++) {
      if (newUnique.includes(tagEArr[i].innerHTML) === true) {
        console.log("hi");
        tagEArr[i].remove();
      }
    }
    if (document.getElementsByClassName("tagE") === null) {
      document.getElementById("tagArrow").innerHTML = "&9650;";
    }
  }
}

// click on title to expand
var expand2 = 0;
function expand(event) {
  let chosentitle = event.target;
  let taskname = chosentitle.getAttribute("id");
  let todo = document.getElementById(taskname);
  let description = document.getElementById(taskname + "1");
  let date = document.getElementById(taskname + "2");
  let dateinput = document.getElementById("date").value;
  if (expand2 === 0) {
    todo.style.display = "grid";
    todo.style.gridTemplateRows = "1fr 1fr 1fr";
    todo.style.marginTop = "0em";
    chosentitle.style.gridRows = "1";
    description.style.display = "block";
    if (date !== null) {
      if (dateinput !== "" || arguments[1] === 0) {
        date.style.display = "block";
      }
    }
    let getDesHeight = description.offsetHeight;
    todo.style.height = 60 + getDesHeight + "px";
    expand2 = 1;
  } else {
    todo.style.height = "30px";
    todo.style.gridTemplateRows = "none";
    description.style.display = "none";
    if (date !== null) {
      if (dateinput !== "" || arguments[1] === 0) {
        date.style.display = "none";
      }
    }
    expand2 = 0;
  }
}

// change the border to green on focus
function highlight() {
  box.style = "border:2px solid #026670";
}

// change the border to grey when out of focus
function remhigh() {
  box.style = "border:1px solid #525252";
}

window.addEventListener("click", prExpand);
// priority list arrow

function prExpand(event) {
  let entries = document.querySelectorAll(".entry");
  let prArrow = document.getElementById("prArrow");
  let prOp = document.querySelectorAll(".pr");
  let high = document.getElementById("high");
  let prLi = document.getElementById("prioritylist");
  if (event.target === prLi || event.target === prArrow) {
    if (high.style.display === "none") {
      for (var i = 0; i < prOp.length; i++) {
        prOp[i].style.display = "block";
      }
      for (var i = 0; i < entries.length; i++) {
        entries[i].style.display = "grid";
      }
      lowBtn.style.backgroundColor = "#D3FFE0";
      medBtn.style.backgroundColor = "#FFFDD3";
      highBtn.style.backgroundColor = "#FFD3D3";
      prArrow.innerHTML = "&#9650;";
    } else {
      for (var i = 0; i < prOp.length; i++) {
        prOp[i].style.display = "none";
      }
      prArrow.innerHTML = "&#9660;";
    }
  }
}

window.addEventListener("click", tagExpand);
preTagArr = [];

window.addEventListener("beforeunload", function () {
  localStorage.setItem("tagsStore", JSON.stringify(savedTags));
  localStorage.setItem("allTags", JSON.stringify(allTags));
});

window.addEventListener("load", function () {
  let loadTags = JSON.parse(localStorage.getItem("tagsStore"));
  let loadAllTags = JSON.parse(localStorage.getItem("allTags"));
  if (loadTags !== null) {
    for (var i = 0; i < loadTags.length; i++) {
      savedTags.push(loadTags[i]);
    }
  }
  if (loadAllTags !== null) {
    for (var i = 0; i < loadAllTags.length; i++) {
      allTags.push(loadAllTags[i]);
    }
  }
});
let tagIndex = 0;
function tagExpand(event) {
  let tagsList = document.getElementById("tagsList");
  let tagArrow = document.getElementById("tagArrow");
  let tagHr = document.getElementById("tagHr");
  if (event.target === tagHr || event.target === tagArrow) {
    if (savedTags.length !== 0) {
      if (tagIndex === 1) {
        let tagsLabel = document.getElementsByClassName("tagE");
        for (var i = 0; i < tagsLabel.length; i++) {
          tagsLabel[i].style.display = "none";
          tagsLabel[i].classList.remove("tagSelect");
          tagsLabel[i].style.backgroundColor = "white";
        }
        tagArrow.innerHTML = "&#9660;";
        tagIndex = 0;
        let allEntries = document.getElementsByClassName("entry");
        for (var i = 0; i < allEntries.length; i++) {
          allEntries[i].style.display = "grid";
        }
      } else {
        for (var i = 0; i < savedTags.length; i++) {
          if (preTagArr.includes(savedTags[i]) === false) {
            let tagElement = document.createElement("div");
            tagElement.innerHTML = savedTags[i];
            preTagArr.push(savedTags[i]);
            tagElement.className = "tagE";
            tagElement.style.display = "block";
            tagElement.addEventListener("click", tagSort);
            tagsList.appendChild(tagElement);
          }
        }
        tagIndex = 1;
        tagArrow.innerHTML = "&#9650;";
        let tagsLabel = document.querySelectorAll(".tagE");
        for (var i = 0; i < tagsLabel.length; i++) {
          tagsLabel[i].style.display = "block";
        }
      }
    } else {
      tagArrow.innerHTML = "&#9660;";
    }
  }
}

function tagSort(event) {
  if (event.target.classList[1] !== "tagSelect") {
    let tagEach = document.querySelectorAll(".tagE");
    for (var i = 0; i < tagEach.length; i++) {
      tagEach[i].style.backgroundColor = "white";
      tagEach[i].classList.remove("tagSelect");
    }
    event.target.classList.add("tagSelect");
    event.target.style.backgroundColor = "#ddd";
    let entry = [];
    let allEntries = document.getElementsByClassName("entry");
    for (var i = 0; i < allEntries.length; i++) {
      allEntries[i].style.display = "none";
      tagClicked = true;
    }

    let corr = document.getElementsByClassName(event.target.innerHTML);
    for (var i = 0; i < corr.length; i++) {
      let id = corr[i].id;
      entry.push(document.getElementById(id.substr(0, id.length - 1)));
    }
    for (var i = 0; i < entry.length; i++) {
      entry[i].style.display = "grid";
    }
  } else {
    let allEntries = document.getElementsByClassName("entry");
    for (var i = 0; i < allEntries.length; i++) {
      allEntries[i].style.display = "grid";
    }
    event.target.style.backgroundColor = "white";
    event.target.classList.remove("tagSelect");
  }
}

window.addEventListener("click", prSelect);

function prSelect(event) {
  let entries = document.querySelectorAll(".entry");

  if (event.target === lowBtn) {
    lowIndex = 0;
    lowBtn.style.backgroundColor = "#B0E8C0";
    medBtn.style.backgroundColor = "#FFFDD3";
    highBtn.style.backgroundColor = "#FFD3D3";

    for (var i = 0; i < entries.length; i++) {
      if (entries[i].className === "entry prLowE") {
        entries[i].style.display = "grid";
        lowIndex += 1;
        lowBtn.innerHTML = "Low <span>" + lowIndex + "</span>";
      } else {
        entries[i].style.display = "none";
        lowBtn.innerHTML = "Low <span>" + lowIndex + "</span>";
      }
    }
  }

  if (event.target === medBtn) {
    medIndex = 0;
    lowBtn.style.backgroundColor = "#D3FFE0";
    medBtn.style.backgroundColor = "#EEEAA6";
    highBtn.style.backgroundColor = "#FFD3D3";

    for (var i = 0; i < entries.length; i++) {
      if (entries[i].className === "entry prmedE") {
        entries[i].style.display = "grid";
        medIndex += 1;
        medBtn.innerHTML = "Medium <span>" + medIndex + "</span>";
      } else {
        entries[i].style.display = "none";
        medBtn.innerHTML = "Medium <span>" + medIndex + "</span>";
      }
    }
  }

  if (event.target === highBtn) {
    highIndex = 0;
    lowBtn.style.backgroundColor = "#D3FFE0";
    medBtn.style.backgroundColor = "#FFFDD3";
    highBtn.style.backgroundColor = "#E4A8A8";
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].className === "entry prhighE") {
        entries[i].style.display = "grid";
        highIndex += 1;
        highBtn.innerHTML = "High <span>" + highIndex + "</span>";
      } else {
        entries[i].style.display = "none";
        highBtn.innerHTML = "High <span>" + highIndex + "</span>";
      }
    }
  }
}

// Change background
document.querySelector(".todofunction").style.backgroundImage =
  window.localStorage.getItem("bg");

// get entries from localStorage

window.addEventListener("load", getEntries);

function getEntries() {
  for (var i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    if (key.slice(0, 2) === "sa") {
      let entry = window.localStorage.getItem(key);
      list.innerHTML += entry;
    }
  }
  // add event listener to checkbox for complete
  let checkbox = document.querySelectorAll(".checkbox");
  for (var i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("change", complete);
  }

  let entry = document.querySelectorAll("#list > div");

  // priority counting
  for (var i = 0; i < entry.length; i++) {
    if (entry[i].className === "entry prLowE") {
      lowIndex += 1;
      lowBtn.innerHTML = "Low <span>" + lowIndex + "</span>";
    }
    if (entry[i].className === "entry prmedE") {
      medIndex += 1;
      medBtn.innerHTML = "Medium <span>" + medIndex + "</span>";
    }
    if (entry[i].className === "entry prhighE") {
      highIndex += 1;
      highBtn.innerHTML = "High <span>" + highIndex + "</span>";
    }
  }
  // expanding
  let title = document.querySelectorAll(".entrytitle");
  for (var i = 0; i < title.length; i++) {
    title[i].addEventListener("click", wrapperFunction);
  }
  function wrapperFunction(event) {
    expand(event, 0);
  }

  if (list.innerHTML === "") {
    list.appendChild(liMes);
  }
}

// get due dates
let getDate = document.getElementsByClassName("entrydate");
let getDateArr = [];
let entryIdArr = [];

window.addEventListener("beforeunload", function () {
  for (var i = 0; i < getDate.length; i++) {
    getDateArr.push(getDate[i].innerHTML.slice(8, 18));
    let id = getDate[i].id;
    entryIdArr.push(getDate[i].id.substr(0, id.length - 1));
  }
});
window.addEventListener("beforeunload", function () {
  window.localStorage.setItem("getDateArr", JSON.stringify(getDateArr));
  window.localStorage.setItem("entryIdArr", JSON.stringify(entryIdArr));
});

//reminders
let index = 0;

let interval2 = setInterval(deadline, 1000);

function deadline() {
  let reminder = document.querySelector(".reminders");
  if (reminder.innerHTML !== "") {
    reminder.innerHTML = "";
  }

  let due = document.querySelectorAll(".due");
  for (var i = 0; i < due.length; i++) {
    let text = due[i].innerText;
    let remName = due[i].id;

    let remDate = new Date(text.substr(8));
    let nowDate = new Date();

    if (nowDate >= remDate) {
      function showNotification() {
        const notification = new Notification("To-Do Reminder:", {
          body: remName.substr(0, remName.length - 1) + " is due today.",
          icon: "favicon.png",
        });
      }

      if (Notification.permission === "granted") {
        showNotification();
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            showNotification();
          }
        });
      }

      /* I need do something about this */
      Notification.onclose = function () {
        console.log("hello");
      };

      let alertM = document.createElement("span");
      alertM.className = "alertM";
      let dateObj = new Date();
      let dateStr = dateObj.toLocaleTimeString();
      alertM.innerText =
        remName.substr(0, remName.length - 1) +
        " is due on: " +
        remDate.toString().slice(0, 15);
      reminder.appendChild(alertM);
      var alertBtn = document.createElement("span");
      alertBtn.className = "alertClose";
      alertBtn.innerHTML = "&times";
      alertM.appendChild(alertBtn);
    }
  }
}

window.addEventListener("click", function (event) {
  let target = event.target;
  if (target.className === "alertClose") {
    entryName = target.parentElement.innerHTML.split(" ")[0];
    let entry = document.getElementById(entryName);
    if (entry !== null) {
      let date = entry.childNodes[3];
      date.classList.remove("due");
      localStorage.setItem("savedTodo" + entry.id, entry.outerHTML);
    }
  }
});

// reminder toggle on or off
let toggle = document.querySelector("#reminder > input");
let toggleBool = false;
toggle.addEventListener("change", function () {
  toggleBool = toggle.checked;
});
