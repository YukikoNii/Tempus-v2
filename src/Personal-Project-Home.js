// load today's task

let getDateArr = JSON.parse(localStorage.getItem("getDateArr"));
let entryIdArr = JSON.parse(localStorage.getItem("entryIdArr"));

// get date in yyyy-mm-dd
let todayDate = new Date().toISOString().slice(0, 10);
let tasks = document.querySelector(".task");
window.addEventListener("load", function () {
  if (getDateArr !== null) {
    if (getDateArr.length !== 0) {
      // check against the data array from to-do list
      for (let i = 0; i < getDateArr.length; i++) {
        // if the task is due today
        if (getDateArr[i] === todayDate) {
          let ul = document.createElement("ul");
          tasks.appendChild(ul);
          let eventTask = document.createElement("li");
          eventTask.className = "toTask";
          // display the title of the task
          eventTask.innerHTML = entryIdArr[i];
          ul.appendChild(eventTask);
        }
      }
    } else {
      displayNoTaskMessage();
    }
  } else {
    displayNoTaskMessage();
  }
});

function displayNoTaskMessage() {
  // display a message that there is no task
  tasks.innerHTML +=
    '<div class="noTask">There is no task for today.<br> <div class="linkTodo">add new task</div></div>';
  document.querySelector(".linkTodo").addEventListener("click", function () {
    location.href = "Personal-Project-Todo.html";
  });
}
