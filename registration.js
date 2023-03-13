function validateForm() {
    let valid = true;
  
    // Validate email
    let emailInput = document.getElementById("email");
    let email = emailInput.value.trim().toLowerCase();
    if (!isValidEmail(email)) {
      emailInput.setCustomValidity("Please enter a valid email address.");
      valid = false;
    } else {
      emailInput.setCustomValidity("");
    }
  
    // Validate password and re-entered password
    let passwordInput = document.getElementById("password");
    let password = passwordInput.value.trim();
    let confirmInput = document.getElementById("confirm");
    let confirm = confirmInput.value.trim();
    if (password !== confirm) {
      confirmInput.setCustomValidity("Passwords do not match.");
      valid = false;
    } else {
      confirmInput.setCustomValidity("");
    }
  
    // Validate first name
    let firstnameInput = document.getElementById("firstname");
    let firstname = firstnameInput.value.trim();
    if (!isValidName(firstname)) {
      firstnameInput.setCustomValidity("Please enter a valid first name.");
      valid = false;
    } else {
      firstnameInput.setCustomValidity("");
    }
  
    // Validate last name
    let lastnameInput = document.getElementById("lastname");
    let lastname = lastnameInput.value.trim();
    if (!isValidName(lastname)) {
      lastnameInput.setCustomValidity("Please enter a valid last name.");
      valid = false;
    } else {
      lastnameInput.setCustomValidity("");
    }
  
    // Validate date of birth
    let dobInput = document.getElementById("dob");
    let dob = new Date(dobInput.value);
    if (isNaN(dob.getTime())) {
      dobInput.setCustomValidity("Please enter a valid date of birth.");
      valid = false;
    } else if (!isValidAge(dob)) {
      dobInput.setCustomValidity("You must be at least 18 years old to register.");
      valid = false;
    } else {
      dobInput.setCustomValidity("");
    }
  
    // Validate state code
    let stateInput = document.getElementById("state");
    let state = stateInput.value.trim().toUpperCase();
    if (!isValidState(state)) {
      stateInput.setCustomValidity("Please enter a valid 2-character state code.");
      valid = false;
    } else {
      stateInput.setCustomValidity("");
    }
  
    // Validate postal code
    let postalcodeInput = document.getElementById("postalcode");
    let postalcode = postalcodeInput.value.trim().toUpperCase();
    if (!isValidPostalCode(postalcode)) {
      postalcodeInput.setCustomValidity("Please enter a valid 6-character postal code.");
      valid = false;
    } else {
      postalcodeInput.setCustomValidity("");
    }
  
    // Validate newsletter subscription
    let newsletterInput = document.getElementById("newsletter");
    if (newsletterInput.checked) {
      // Do something with the checked value
    }
  
    return valid;
  }
  
  function isValidEmail(email) {
    // Basic email validation - this could be improved
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function isValidName(name) {
    // Only allow letters, spaces, and hyphens in names
    return /^[A-Za-z\s-]+$/.test(name);
  }
  
  function isValidState(state) {
    // Only allow 2-character codes that are not numeric
    return /^[A-Za-z]{2}$/.test(state) && isNaN(state);
  }
  
  function isValidPostalCode(postalcode) {
    // Allow 6-character codes with the pattern A1A1A1
    return /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/.test(postalcode
  