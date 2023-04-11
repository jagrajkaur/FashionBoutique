const userData = JSON.parse(window.localStorage.getItem("userData"));
document.getElementById("email").value = userData.email;
document.getElementById("password").value = userData.password;

const form = document.getElementById("member_form");
form.addEventListener("submit", function(event) {
  event.preventDefault(); 
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let isValid = true; 

  if (!email || !password) { // check if fields are empty
    alert("Please enter both email and password.");
    isValid = false;
  }

  // Check if email is in correct format using a regular expression
  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!email.match(emailPattern)) {
    // If email is not in correct format, show an error message and set isValid to false
    alert('Please enter a valid email address.');
    isValid = false;
  }

  // Define regular expressions for password requirements
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Check if password meets requirements
  if (!passwordRegex.test(password)) {
    // If password does not meet requirements, show an error message and set isValid to false
    alert('Passwords must be at least 8 characters long and contain at least one number, one special character, and one uppercase letter.');
    isValid = false;
  }
    
  // check if email is existing
  if (email !== userData.email ) {
    alert("Email not existing. Please register.");
    isValid = false;
  }

  // check if password is correct from localStorage
  if (password !== userData.password) {
    alert("Wrong password.");
    isValid = false;
  }

  // clear success if there's invalid entry
  if (!isValid) {
    // clear success message and section
    const successSection = document.getElementById("success-section");
    successSection.innerHTML = "";
    return;
  }

  // user welcome
  const loggedInUser = email;
  const loggedInUserType = "user";

  // show welcome success login 
  const successMsg = document.createElement("div");
  successMsg.className = "alert alert-success mt-4";
  successMsg.role = "alert";
  successMsg.innerHTML = `Welcome, ${loggedInUser}!`;

  const successSection = document.getElementById("success-section");
  successSection.innerHTML = "";
  successSection.appendChild(successMsg);

  // clear fields when successful
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  var usertype = document.getElementById("usertype").value;
  if (usertype == "admin") {
    document.body.style.backgroundColor = "pink";
  }  
});
