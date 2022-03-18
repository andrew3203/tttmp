<?php 
if(isset($_POST['submit'])){
    $to = "kuand3203@gmail.com"; // this is your Email address
    $from = 'v.timofeev@legend-a.ru'; // this is the sender's Email address
    $tel = $_POST["tel"];
    $email = $_POST["email"];
    $name = $_POST["name"];
    $leadFormCheck = $_POST["leadFormCheck"];
    $subject = "Form submission";
    $message = ''.$_POST.''

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
?>