if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Read the existing data from the JSON file
  $jsonData = file_get_contents('registrations.json');
  $registrations = json_decode($jsonData, true);

  // Append the new data to the existing data
  $data = $_POST;
  array_push($registrations, $data);

  // Save the updated data to the JSON file
  $jsonData = json_encode($registrations, JSON_PRETTY_PRINT);
  file_put_contents('registrations.json', $jsonData);

  // Send a response to the client
  $response = array('status' => 'success', 'message' => 'Registration successful.');
  echo json_encode($response);

    // Debug echo statements
    echo "<br><br>Debug Info:<br>";
    echo "POST Data:<br>";
    print_r($_POST);
    echo "<br>";
    echo "JSON Data:<br>";
    echo $jsonData;


} else {
  // Send an error response to the client
  $response = array('status' => 'error', 'message' => 'Invalid request method.');
  http_response_code(400);
  echo json_encode($response);

    // Debug echo statements
    echo "<br><br>Debug Info:<br>";
    echo "POST Data:<br>";
    print_r($_POST);
    echo "<br>";
    echo "JSON Data:<br>";
    echo $jsonData;
}
