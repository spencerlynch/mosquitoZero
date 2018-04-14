<?php
if($_POST)
{
    $to_email       = "spencer.lynch@workwithspencer.com"; //Recipient email, Replace with own email here
    
    //check if its not an ajax request just exit!
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        print "Can't access directly!";
        exit;
    } 
    
    //Sanitize input data using PHP filter_var().
    $sender_Name    = filter_var($_POST["user_Name"], FILTER_SANITIZE_STRING);
    $sender_Email   = filter_var($_POST["user_Email"], FILTER_SANITIZE_EMAIL);
    $phone_Number   = filter_var($_POST["phone_Number"], FILTER_SANITIZE_NUMBER_INT);
    $subject        = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
    $message        = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
    
    //additional php validation
    if(strlen($sender_Name)<3){ // If length is less than 4 it will output JSON error.
        $output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
        die($output);
    }
    if(!filter_var($sender_Email, FILTER_VALIDATE_EMAIL)){ //email validation
        print json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        exit;
    }
    if(!filter_var($phone_Number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
        print json_encode(array('type'=>'error', 'text' => 'Enter only digits in phone number'));
        exit;
    }
    if(strlen($message)<3){ //check emtpy message
        print json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
        exit;
    }
    
	
 	//email body
    $message_body =  "Message from $sender_Name\n";
    $message_body .=  "------------------------------\n";
    $message_body .=  "$message\n";
    $message_body .=  "------------------------------\n";
    $message_body .=  "$sender_name\n";
    $message_body .=  "$sender_email\n";
    $message_body .=  "$phone_Number\n";
	    
    //proceed with PHP email.
    $headers = 'From: '. $sender_Name, .'' . "\r\n" .
    'Reply-To: '.$sender_Email.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    $send_mail = mail($to_email, $sender_Name, $subject, $message_body, $headers);
    
    if(!$send_mail){
        //If mail couldn't be sent, this is probably server's fault, check your mail configuration or consult your host
        print json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration or consult your web host.'));
        exit;
    }else{
        print json_encode(array('type'=>'message', 'text' => 'Hi '. $sender_Name.' Thank you for your email, we will be in touch soon!'));
        exit;
    }
}
?>