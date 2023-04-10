// This function is called when the form is submitted
function validateForm() {
  // Get form inputs using the DOM API
  var email = document.forms["registrationForm"]["email"].value;
  var password = document.forms["registrationForm"]["password"].value;
  var confirmPassword = document.forms["registrationForm"]["confirmPassword"].value;
  var firstName = document.forms["registrationForm"]["firstName"].value;
  var lastName = document.forms["registrationForm"]["lastName"].value;
  var dateOfBirth = document.forms["registrationForm"]["dateOfBirth"].value;
  var gender = document.forms["registrationForm"]["gender"].value;
  var streetAddress = document.forms["registrationForm"]["streetAddress"].value;
  var city = document.forms["registrationForm"]["city"].value;
  var stateCode = document.forms["registrationForm"]["stateCode"].value;
  var postalCode = document.forms["registrationForm"]["postalCode"].value;
  var newsletter = document.forms["registrationForm"]["newsletter"].checked;

  // Regular expression patterns for validation
  var namePattern = /^[a-zA-Z]+$/; // Only allow alphabets for first name and last name
  var stateCodePattern = /^[a-zA-Z]{2}$/; // Only allow 2 alphabet characters for state code
  var postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // Postal code format validation regex pattern

  // Check if all required fields are filled
  if (email == "" || password == "" || confirmPassword == "" || firstName == "" || lastName == "" || dateOfBirth == "" || gender == "" || streetAddress == "" || city == "" || stateCode == "" || postalCode == "") {
    alert("Please fill out all required fields.");
    return false; // Prevent form submission if required fields are not filled
  }

  // Check if password and confirm password fields match
  if (password != confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // Check if first name and last name contain only alphabets
  if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
    alert("First name and last name should only contain characters.");
    return false;
  }

  // Check if state code contains only 2 alphabets
  if (!stateCodePattern.test(stateCode)) {
    alert("State code should contain only 2 characters.");
    return false;
  }

  // Check if postal code follows the pattern A1A 1A1
  if (!postalCodePattern.test(postalCode)) {
    alert("Postal code should contain 6 characters and be in the format of A1A 1A1.");
    return false;
  }

  // Check if the user is above 18 years of age
  var today = new Date(); // Today's date
  var birthDate = new Date(dateOfBirth); // Convert date of birth string to a Date object
  var age = today.getFullYear() - birthDate.getFullYear(); // Calculate the age
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--; // Subtract a year if birth month or date is after current month or date
  }
  if (age < 18) {
    alert("You must be at least 18 years old to register.");
    return false;
  }

  // Success
  alert("Registration successful.");
  return true; // Allow form submission
}
