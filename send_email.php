<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['user-name-contact']));
    $email = htmlspecialchars(trim($_POST['user-email-contact']));
    $message = htmlspecialchars(trim($_POST['user-message-contact']));

    // Remove newline to prevent header injection
    $name = str_replace(array("\r", "\n", "%0a", "%0d"), '', $name);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Wrong email format";
        exit;
    }

    $to = "mishafort228@gmail.com";
    $subject = "New message from $name";
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Your message has been sent successfully.";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Wrong request";
}
?>
