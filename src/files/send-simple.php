<?php
    $pagePath = explode('/wp-content/', dirname(__FILE__));
    include_once(str_replace('wp-content/' , '', $pagePath[0] . '/wp-load.php'));

    $admin_email = get_option('admin_email');

    $params = array(
        'name'=> 'Name',
        'last-name'=> 'Last name',
        'email'=> 'Email',
        'phone'=> 'Phone',
        'city'=> 'City',
        'state'=> 'State',
        'zip'=> 'Zip',
        'experienced'=> 'Experienced and interesed',
        'age'=> 'Age',
        'msg'=> '',
        'order-number'=> 'Order Number',
        'callback-time'=> 'Callback Time',
        'pick-up-address'=> 'Pick up address',
        'moving-to-address'=> 'Moving to address',
        'date'=> 'Moving date',
        'size'=> 'Size of me',
        'contact-method'=> 'Prefered method to contact',
        'company-website'=> 'Company website',
        'interstate-linehaul-volume'=> 'Annual interstate linehaul volume',
        'affiliated'=> 'Affiliated with a carrier',
        'interested'=> 'I am interested in becoming...'
    );

    $values = [];
    foreach ($params as $param => $l18n) {
        if (isset($_POST[$param])) {
            $values[$param] = htmlspecialchars($_POST[$param]);
        }
    }

    $title = 'work-for-us';
    $body = '';
    foreach ($values as $key => $value) {
        $body .= $params[$key] . ': ' . $value . "\n";
    }

    $to = $admin_email;
    $subject = $title;
    $message = $body;

    wp_mail($to, $subject, $message);
    exit();

 
//Host = 'ssl://smtp.jino.ru';
//Username = 'info@hauberk78.ru';
//Password = "E9crK8QaFVjMP8";
//Port = 465;
//setFrom('info@hauberk78.ru', 'HAUBERG');
?>
