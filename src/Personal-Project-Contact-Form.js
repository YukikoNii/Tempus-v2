// validate email address

let email = document.getElementById('Email');
email.addEventListener('change', validEmail);

let emailAlert = document.getElementById('emailAlert');

function validEmail () {
  let expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  email.value.match(expression) ? emailAlert.style.display = 'none' : emailAlert.style.display = 'block';
}

// send email
document.querySelector('.submit').addEventListener('click', send);


function send () {
  let subject = document.getElementById('name').value;
  let body = document.getElementById('Message').value;
  let phone = document.getElementById('phone').value;
  // TODO: use sendgrid or other ways to send email. 
  if (subject !== '' && body !== '' && email.value !== '') {
  let href = 'mailto:NIIY64308@scis-student.org?subject=' + subject + '&body=' + body + '%0D%0A%0D%0A From: '  + email.value + ',' + phone ;
  location.href=href;
}
else {
  // TODO: should show text message instead of alert form 
  alert('Please enter all the required information');
}
}

document.querySelector('.logo').addEventListener('click', function () {
  location.href = 'Personal-Project-Landing-Page.html';
});