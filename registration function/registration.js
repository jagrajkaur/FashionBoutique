function validateForm() {
  // Get form inputs
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

  // Regular expression patterns
  var namePattern = /^[a-zA-Z]+$/;
  var stateCodePattern = /^[a-zA-Z]{2}$/;
  var postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

  // Check required fields
  if (email == "" || password == "" || confirmPassword == "" || firstName == "" || lastName == "" || dateOfBirth == "" || gender == "" || streetAddress == "" || city == "" || stateCode == "" || postalCode == "") {
    alert("Please fill out all required fields.");
    return false;
  }

  // Check password match
  if (password != confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // Check first name and last name
  if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
    alert("First name and last name should only contain characters.");
    return false;
  }

  // Check state code
  if (!stateCodePattern.test(stateCode)) {
    alert("State code should contain only 2 characters.");
    return false;
  }

  // Check postal code
  if (!postalCodePattern.test(postalCode)) {
    alert("Postal code should contain 6 characters and be in the format of A1A 1A1.");
    return false;
  }

  // Check age
  var today = new Date();
  var birthDate = new Date(dateOfBirth);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    alert("You must be at least 18 years old to register.");
    return false;
  }

  // Success
  alert("Registration successful.");
  return true;
}
