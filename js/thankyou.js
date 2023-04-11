
/**
 * Rajwant Kaur
 */

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  /**
   * Rajwant Kaur- Create tracking id once html page is loaded
   */
  ready();
}

/**
 * Rajwant Kaur-- Generate a random tracking ID for users to track their order.
 * @returns 
 */
function generateTrackingId() {
  var currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  var randomString = Math.random().toString(36).substring(2, 8);
  return currentDate + randomString;
}

function ready() {
  /**
   * Rajwant Kaur- Create tracking id and  append in html.
   */
  var trackingId = generateTrackingId();
  
  console.log(trackingId);

  var trackingElement = document.getElementById('tracking'); // Rajwant Kaur- Get tracking ID element.
  trackingElement.innerText = 'You can track your order with tracking Id ' + trackingId; // Insert tracking Id in html element.
}