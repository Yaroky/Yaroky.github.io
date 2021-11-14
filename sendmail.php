<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setFrom('alekno.arina@gmail.com', 'Это я');
// Кому письмо
$mail->addAddress('alekno.yaroslav@gmail.com');
// Тема письма
$mail->Subject = 'Привет, это письмо человека, который сделал эту проклятую форму';

// Тело письма
$body = '<h1>То самое письмо</h1>';

if (trim(!empty($_POST['surname']))) {
    $body .= '<p><strong>Фамилия: </strong> ' . $_POST['surname'] . '</p>';
}

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Имя: </strong> ' . $_POST['name'] . '</p>';
}

if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail: </strong> ' . $_POST['email'] . '</p>';
}

if (trim(!empty($_POST['date']))) {
    $body .= '<p><strong>Дата рождения: </strong> ' . $_POST['date'] . '</p>';
}


//Присваиваем переменную в плагин 

$mail->Body = $body;

// Отправка

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
$message = 'Данные отправлены!';
}

// Формируем json
$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
