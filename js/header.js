fetch("header.html")
  .then(response => response.text())
  .then(data => {
    // Insert the header HTML into the current page
    const header = document.querySelector("header");
    header.innerHTML = data;
  });
