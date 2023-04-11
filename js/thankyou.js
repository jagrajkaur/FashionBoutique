


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function generateTrackingId() {
    var currentDate = new Date().toISOString().slice(0,10).replace(/-/g,"");
    var randomString = Math.random().toString(36).substring(2, 8);
    return currentDate + randomString;
  }
  
  function ready() {
  // Example usage: generate a random tracking ID
  var trackingId = generateTrackingId();
  console.log(trackingId);
var trackingElement=  document.getElementById('tracking') ;
trackingElement.innerText='You can track your order with tracking Id '+trackingId;
  }