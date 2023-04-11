// Get references to the form elements
const form = document.getElementById('registration-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const stylePreference = document.getElementById('style-preference');
const privacyPolicy = document.getElementById('privacy-policy');
const exclusiveOffers = document.getElementById('exclusive-offers');



// Add a submit event listener to the form
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

    // // Save the form data to an array
    // const formDataArray = JSON.parse(localStorage.getItem('formData')) || [];
    // formDataArray.push(formData);

    // // Convert the array to JSON and store it in local storage
    // const jsonData = JSON.stringify(formDataArray);
    // localStorage.setItem('formData', jsonData);
    // Store data in local storage

    // Store the user data in local storage
    window.localStorage.setItem("userData", JSON.stringify(formData));

    // If registration is successful, show a success message and reset the form
    alert('Registration successful!');
    form.reset();
    window.location.href = "../login.html";


    // Create a new Blob object with the form data
    const blob = new Blob([jsonData], {type: "text/plain"});

    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);

/*     // Create a link to allow the user to download the file
    const link = document.createElement("a");
    link.download = "formData.txt";
    link.href = url;
    link.click(); */
  }
});

function validateForm() {
  let isValid = true;

  // Check if email is in correct format using a regular expression
  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!email.value.match(emailPattern)) {
    // If email is not in correct format, show an error message and set isValid to false
    alert('Please enter a valid email address.');
    isValid = false;
  }

  // Define regular expressions for password requirements
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Check if password meets requirements
  if (!passwordRegex.test(password.value)) {
    // If password does not meet requirements, show an error message and set isValid to false
    alert('Passwords must be at least 8 characters long and contain at least one number, one special character, and one uppercase letter.');
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    // If passwords do not match, show an error message and set isValid to false
    alert('Passwords do not match.');
    isValid = false;
  }




  // Check if privacy policy is checked
  if (!privacyPolicy.checked) {
    // If privacy policy is not checked, show an error message and set isValid to false
    alert('Please agree to the privacy and cookie policy.');
    isValid = false;
  }

  // If form is valid, return true
  return isValid;
}

// const formDataArray = JSON.parse(localStorage.getItem('formData')) || [];
// console.log(formDataArray);
