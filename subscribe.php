<?php
// Check if the request is a POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the email from the POST request
    $email = trim($_POST['email']);
    
    // Validate the email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        http_response_code(400); // Send a 400 bad request
        exit;
    }

    // File where emails will be stored
    $file = 'subscribers.csv';

    // Open the file in append mode
    $fileHandle = fopen($file, 'a');

    // If file opening fails
    if ($fileHandle === false) {
        echo "Unable to open the file.";
        http_response_code(500); // Send a 500 internal server error
        exit;
    }

    // Write the email to the CSV file
    // Add the email to the CSV file
    fputcsv($fileHandle, [$email]);

    // Close the file
    fclose($fileHandle);

    // Send success response
    echo "Thank you for subscribing!";
    http_response_code(200); // Send a 200 OK response
} else {
    // If the request method isn't POST, return an error
    echo "Invalid request method.";
    http_response_code(405); // Send a 405 method not allowed
}
?>

<?php
