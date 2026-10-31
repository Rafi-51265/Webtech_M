
<?php

$errormessage = " ";
$success = " ";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $student_id = trim($_POST["student_id"]);
    $message = trim($_POST["message"]);

    if (empty($student_id) || empty($message)) {

        $errormessage = "Student ID & Message are required to login.";

    } else {

        $file = fopen("log.txt", "a");

        $log = $student_id . " | " . $message . PHP_EOL;

        fwrite($file, $log);

        fclose($file);

        $success = "Login successfully!";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php if ($errormessage): ?>
    <?php echo htmlspecialchars($errormessage); ?>
    <?php endif; ?>
    <?php if ($success): ?>
    <?php echo htmlspecialchars($success); ?>
    <?php endif; ?>
    
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">

    <label>Student ID:</label>
    <input type="text" name="student_id" required><br><br>

    <label>Log Message:</label>
    <textarea name="message" required></textarea><br><br>

    <input type="submit" value=" Login ">

</form>

<hr>

<?php

if (file_exists("log.txt")) {

    $logs = file_get_contents("log.txt");

    echo "<pre>" . htmlspecialchars($logs) . "</pre>";

} else {

    echo "<p>No log entries yet.</p>";

}

?>

</body>
</html>
