/*

events

*/

window.addEventListener("load", renderEvents);

function renderEvents() {
  // get date divs
  let day = document.getElementsByClassName("day");
  // get the span that contains the date
  let dayVal = document.querySelectorAll(".day > span");
  // create an array of dates in two digits
  let dayValArr = [];
  for (var i = 0; i < dayVal.length; i++) {
    let num = dayVal[i].innerHTML;
    if (num < 10) {
      dayValArr.push("0" + num);
    } else {
      dayValArr.push(num);
    }
  }

  let headDate = document.querySelector(".date > h1").innerHTML.split(" ");
  // get month from the display
  let month = headDate[0];
  // get year from the display
  let year = headDate[1];

  let correctMonth = "";
  for (var i = 0; i < months.length; i++) {
    // months is the array that contains the names of months
    if (months[i] === month) {
      if (i < 9) {
        let monthNum = i + 1;
        correctMonth = "0" + monthNum;
      } else {
        correctMonth = i + 1;
      }
    }
  }

  let dateArr = [];

  for (var i = 0; i < dayValArr.length; i++) {
    // format: yyyy-mm-dd
    dateArr.push(year + "-" + correctMonth + "-" + dayValArr[i]);
  }

  // local storage, saved in todo.js
  let getDateArr = JSON.parse(window.localStorage.getItem("getDateArr"));

  // name of the tasks
  let entryIdArr = JSON.parse(window.localStorage.getItem("entryIdArr"));
  if (getDateArr !== null) {
    for (let i = 0; i < getDateArr.length; i++) {
      for (let j = 0; j < dateArr.length; j++) {
        if (getDateArr[i] === dateArr[j]) {
          // create div when they have the same date
          let eventCal = document.createElement("div");
          eventCal.className = "eventCal";
          // display the title of the task
          eventCal.innerHTML = entryIdArr[i];
          day[j].appendChild(eventCal);
        }
      }
    }
  }

  // get today's date in ISO format
  let todayDate = new Date().toISOString().slice(0, 10);
  let today = document.querySelector(".today");
  if (today !== null && getDateArr !== null) {
    for (let i = 0; i < getDateArr.length; i++) {
      // if date is today
      if (getDateArr[i] === todayDate) {
        let eventCal = document.createElement("div");
        eventCal.className = "eventCal";
        // display the title of the task
        eventCal.innerHTML = entryIdArr[i];
        today.appendChild(eventCal);
      }
    }
  }
}
