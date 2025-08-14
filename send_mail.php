<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form inputs
    $firstName = trim($_POST['FirstName']);
    $lastName = trim($_POST['LastName']);
    $email = trim($_POST['Email']);
    $phoneNumber = trim($_POST['PhoneNumber']);
    $message = trim($_POST['Message']);

    // Validate inputs
    if (empty($firstName) || empty($lastName) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        echo "Please fill in all required fields.";
        http_response_code(400);
        exit;
    }

    // Prepare the email
    $to = 'info@talenttrack.com';
    $subject = 'New Contact Form Submission';
    $body = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nPhone: $phoneNumber\n\nMessage:\n$message";
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for contacting us!";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
} else {
    echo "Invalid request.";
    http_response_code(405);
}
?>
