                                                                                  /* 
                                                                                  This contains the js code for the registration function of the website
                                                                                  Owned and created by Michelle R. Hementera
                                                                                  C0863836
                                                                                  */

// Get references to the form elements
const form = document.getElementById('registration-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const stylePreference = document.getElementById('style-preference');
const privacyPolicy = document.getElementById('privacy-policy');
const exclusiveOffers = document.getElementById('exclusive-offers');

function showAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.className = 'alert';
  alertBox.textContent = message;
  document.getElementById('error-message').appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}


form.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Call the validateForm function
  if (validateForm()) {
    // If validation is successful, create an object with the form data
    const formData = {
      email: email.value,
      password: password.value,
      stylePreference: stylePreference.value,
      exclusiveOffers: exclusiveOffers.checked,
    };

    // Save the form data to an array
    const formDataArray = JSON.parse(localStorage.getItem('formData')) || [];

    // Check if email is already registered
    const isEmailRegistered = formDataArray.some(data => data.email === formData.email);
    if (isEmailRegistered) {
      // If email is already registered, show an error message and return
      showAlert('This email is already registered. Please use a different email.');
      return;
    }

    formDataArray.push(formData);

    // Convert the array to JSON and store it in local storage
    const jsonData = JSON.stringify(formDataArray);
    localStorage.setItem('formData', jsonData);

    // If registration is successful, show a success message and reset the form
    window.alert('Fashion: Registration successful!');
    form.reset();

    // Redirect the user to the login page
    window.location.href = "login.html";
  }
});

function validateForm() {
  let isValid = true;

  // Check if email is in correct format using a regular expression
  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!email.value.match(emailPattern)) {
    // If email is not in correct format, show an error message and set isValid to false
    showAlert('Please enter a valid email address.');
    isValid = false;
  }

  // Define regular expressions for password requirements
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Check if password meets requirements
  if (!passwordRegex.test(password.value)) {
    // If password does not meet requirements, show an error message and set isValid to false
    showAlert('Passwords does not comply with standards');
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    // If passwords do not match, show an error message and set isValid to false
    showAlert('Passwords do not match.');
    isValid = false;
  }

  // Check if privacy policy is checked
  if (!privacyPolicy.checked) {
    // If privacy policy is not checked, show an error message and set isValid to false
    showAlert('Please agree to the privacy and cookie policy.');
    isValid = false;
  }

  // If form is valid, return true
  return isValid;
}

const formDataArray = JSON.parse(localStorage.getItem('formData')) || [];
console.log(formDataArray);
