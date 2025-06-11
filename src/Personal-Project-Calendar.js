// get today's date
const date = new Date();

// months array
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function renderCalendar() {
  // set the date to 1
  date.setDate(1);


  const monthDays = document.querySelector('.days');

  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  // get last day of the month
  const lastDay = lastDate.getDate();

  // get day of the week of the first day of the month
  const firstDayIndex = date.getDay();

  // get last day of last month
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();


  // get day of the week of the last day of the month
  const lastDayIndex = lastDate.getDay();

  // calculate how many days of the next month will be on the calendar
  const nextMonthDays = 6 - lastDayIndex;

  // show month and year as header
  document.querySelector('.date h1').innerHTML = months[date.getMonth()] + ' ' + date.getFullYear();
  // show today's date
  document.querySelector('.date p').innerHTML = new Date().toDateString();

  let days = '';

  // display last few days of the last month, depending on what day of the week this month starts
  for (let i = firstDayIndex; i > 0; i--) {
    days += `<div class="prevDate">${prevLastDay - i + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    // if the date matches with today's date
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
      days += `<div class="today"><span>${i}</span></div>`;
    } else {
      days += `<div class="day"><span>${i}</span></div>`;
    }
  }


  // display the first few days of next month
  for (let i = 1; i <= nextMonthDays; i++) {
    days += `<div class="nextDate">${i}</div>`;
  }

  monthDays.innerHTML = days;
}


// get prev arrow
let prev = document.querySelector('.prev');
prev.addEventListener('click', prevMonth);
prev.addEventListener('click', renderEvents);
// get next arrow
let next = document.querySelector('.next');
next.addEventListener('click', nextMonth);
next.addEventListener('click', renderEvents);

function nextMonth() {
  // increase the month by 1
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

function prevMonth() {
  // decrease the month by 1
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
}

renderCalendar();


/*

events

*/


window.addEventListener('load', renderEvents);

function renderEvents() {
  // get date divs
  let day = document.getElementsByClassName('day');
  // get the span that contains the date
  let dayVal = document.querySelectorAll('.day > span');
  // create an array of dates in two digits
  let dayValArr = [];
  for (var i = 0; i < dayVal.length; i++) {
    let num = dayVal[i].innerHTML;
    if (num < 10) {
      dayValArr.push('0' + num);
    } else {
      dayValArr.push(num);
    }
  }

  let headDate = document.querySelector('.date > h1').innerHTML.split(' ');
  // get month from the display
  let month = headDate[0];
  // get year from the display
  let year = headDate[1];

  let correctMonth = '';
  for (var i = 0; i < months.length; i++) {
    // months is the array that contains the names of months
    if (months[i] === month) {
      if (i < 9) {
        let monthNum = i + 1;
        correctMonth = '0' + monthNum;
      } else {
        correctMonth = i + 1;
      }
    }
  }


  let dateArr = [];


  for (var i = 0; i < dayValArr.length; i++) {
    // format: yyyy-mm-dd
    dateArr.push(year + '-' + correctMonth + '-' + dayValArr[i]);
  }

  // local storage, saved in todo.js
  let getDateArr = JSON.parse(window.localStorage.getItem('getDateArr'));

  // name of the tasks
  let entryIdArr = JSON.parse(window.localStorage.getItem('entryIdArr'));
  if (getDateArr !== null) {
    for (let i = 0; i < getDateArr.length; i++) {
      for (let j = 0; j < dateArr.length; j++) {
        if (getDateArr[i] === dateArr[j]) {
          // create div when they have the same date
          let eventCal = document.createElement('div');
          eventCal.className = 'eventCal';
          // display the title of the task
          eventCal.innerHTML = entryIdArr[i];
          day[j].appendChild(eventCal);
        }
      }
    }
  }

  // get today's date in ISO format
  let todayDate = new Date().toISOString().slice(0, 10);
  let today = document.querySelector('.today');
  if (today !== null && getDateArr !== null) {
    for (let i = 0; i < getDateArr.length; i++) {
      // if date is today
      if (getDateArr[i] === todayDate) {
        let eventCal = document.createElement('div');
        eventCal.className = 'eventCal';
        // display the title of the task
        eventCal.innerHTML = entryIdArr[i];
        today.appendChild(eventCal);
      }
    }
  }
};
