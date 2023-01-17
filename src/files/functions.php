<?php
/**
 * Enqueue script and styles for child theme
 */

function woodmart_child_enqueue_styles() {
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'woodmart-style' ), woodmart_get_theme_info( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'woodmart_child_enqueue_styles', 10010 );

add_filter('gettext', 'translate_text', 10, 3);
add_filter('ngettext', 'translate_text', 10, 3);
// часть перевода находится во woodmart custom js
 
function translate_text($translated) {
    $translated = str_ireplace('Подытог', 'Сумма', $translated);
    $translated = str_ireplace('Таблица размеров', 'Характеристики', $translated);
    $translated = str_ireplace('Хит продаж', 'Хит', $translated);
    $translated = str_ireplace('О бренде', 'О производителе', $translated);
    $translated = str_ireplace('Новый', 'Новинка', $translated);
    $translated = str_ireplace('Фильтровать', 'Применить', $translated);
    $translated = str_ireplace('Сумма заказов', 'Ваш заказ', $translated);
    $translated = str_ireplace('Доставка', 'Выбор региона и метода доставки', $translated);
    $translated = str_ireplace('Платёжный адрес', 'Контактные данные', $translated);
    $translated = str_ireplace('Сортировка по более позднему', 'По новинкам', $translated);
    $translated = str_ireplace('Номер дома и название улицы', 'Улица, номер дома, квартира/офис', $translated);
    $translated = str_ireplace('(необязательно)', '', $translated);
    $translated = str_ireplace('Quick view', 'Быстрый просмотр', $translated);
    $translated = str_ireplace('Remove gifts', 'Убрать подарок', $translated);
        
    // cart popup
    $translated = str_ireplace('Shopping cart', 'Корзина', $translated);
    $translated = str_ireplace('Close', 'Закрыть', $translated);
        
    // mobile toolbar
    $translated = str_ireplace('Shop', 'Каталог', $translated);
    $translated = str_ireplace('Wishlist', 'Избранное', $translated);
    $translated = str_ireplace('Cart', 'Коризна', $translated);
    $translated = str_ireplace('My account', 'Аккаунт', $translated);
        
    // mobile menu	
    // $translated = str_ireplace('Search for products', 'Поиск по товарам', $translated); 
    $translated = str_ireplace('Dashboard', 'Панель управления', $translated); 
    $translated = str_ireplace('Orders', 'Заказы', $translated); 
    $translated = str_ireplace('Addresses', 'Адреса', $translated); 
    $translated = str_ireplace('Account details', 'Детали аккаунта', $translated); 
    $translated = str_ireplace('Logout', 'Выход', $translated); 
    $translated = str_ireplace('Compare', 'Сравнить', $translated);
         
    return $translated;
}



if( is_page( 17102 ) ) {
    nocache_headers();
}

define('ALLOW_UNFILTERED_UPLOADS', true);

add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' );
  
function custom_override_checkout_fields( $fields ) {
  unset($fields['billing']['billing_company']);// компания
  unset($fields['billing']['billing_postcode']);// индекс 
    return $fields;
}


add_action( 'woocommerce_after_shop_loop_item_title', 'my_add_short_description', 20 );
function my_add_short_description() {
      echo  '<div class="short_description"><div class="short_text">';
}

add_action( 'woocommerce_after_shop_loop_item_title', 'add_short_description', 21 );
function add_short_description() {
    global $post;
    $text = $post->post_excerpt;
    $maxchar = 120; //максимальное кол-во символов
    
    $text = preg_replace ('~\[[^\]]+\]~', '', $text ); //убираем шорткоды
    
    //удаляем все html символы
    $text = strip_tags( $text);
    
    // Обрезаем
    if ( mb_strlen( $text ) > $maxchar ){
        $text = mb_substr( $text, 0, $maxchar );
        $text = preg_replace('@(.*)\s[^\s]*$@s', '\\1 ...</div><a href="'.get_permalink($product->post->id).'">Подробнее →</a></div>', $text );
    } else {
        $text = $text.'</div></div>';
    }
    echo $text;
}


//Донастройка доставки СДЭК
//add_action( 'woocommerce_checkout_update_order_review', 'action_function_name_6248' );
function action_function_name_6248($input){
    //переводим входные данные в массив
    parse_str($input, $checkoutFields);
    //получаем информацию по выбранному населенному пункту
    $city = WC_Edostavka_Autofill_Addresses::get_city_by_id($checkoutFields['billing_state_id']);
    //определяем регион выбранного населенного пункта
    if (!empty($city) && is_array($city) && isset($city['state'])) {
        if (strpos($city['state'], 'Москва')!==false || strpos($city['state'], 'Московская обл.')!==false){
            $DELIVERY_STATE = 'MSK';
        } else if (strpos($city['state'], 'Санкт-Петербург')!==false || strpos($city['state'], 'Ленинградская обл.')!==false){
            $DELIVERY_STATE = 'SPB';
        } else {
            $DELIVERY_STATE = 'RGNS';
        }
        WC()->session->set( 'DELIVERY_STATE', $DELIVERY_STATE );
    }
}

//В зависимости от региона выбранного населенного пункта устанавливаем бесплатную доставку
//add_filter( 'woocommerce_package_rates', 'calculate_free_shipping', 10, 2 );
function calculate_free_shipping($rates, $package) {
    global $woocommerce;
    $total = $woocommerce->cart->cart_contents_total;
    $DELIVERY_STATE = WC()->session->get( 'DELIVERY_STATE' );

    foreach($rates as $rate_key => $rate_values) {
        $method_id = $rate_values->method_id;
        $rate_id = $rate_values->id;
       
        if ($DELIVERY_STATE=='MSK' && (int)$total>=2500) {
            $rates[$rate_id]->cost = 0;
        }
        if ($DELIVERY_STATE=='SPB' && (int)$total>=2500) {
            $rates[$rate_id]->cost = 0;
        }
        if ($DELIVERY_STATE=='RGNS' && (int)$total>=4000) {
            $rates[$rate_id]->cost = 0;
        }
    }

    return $rates;
}

//Проверяем, если населенный пункт НЕ в МСК или области, удаляем оплату наличными
/*add_filter( 'woocommerce_available_payment_gateways', 'check_available_payment', 20, 1);
function check_available_payment( $gateways ){
    //Функция вызывается в том числе и в админке, чем вызывает ошибку так как там в сессии нет региона
    //Для устранения ошибки в админке была добавлена проверка если пользователь в админке
    //Начало проверки
    if (is_admin()) {
        WC()->session = new WC_Session_Handler();
        WC()->session->init();
    }   
    //конец проверки
    $DELIVERY_STATE = WC()->session->get( 'DELIVERY_STATE', '');
    if ($DELIVERY_STATE!='MSK') {
        unset( $gateways['cod'] );
    }
    return $gateways;
}*/

// Убираем атрибуты title у картинок товаров WooCommerce
add_filter('wp_get_attachment_image_attributes', 'change_attachement_image_attributes', 20, 2);
function change_attachement_image_attributes( $attr, $attachment ) {
// Get post parent
$parent = get_post_field( 'post_parent', $attachment);

// Get post type to check if it's product
$type = get_post_field( 'post_type', $parent);
if( $type != 'product' ){
    return $attr;
}

/// Get title
$title = get_post_field( 'post_title', $parent);

if( $attr['title'] = ''){
    $attr['title'] = $title;
}

return $attr;
}


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// add_shortcode( 'get_city', 'fetch_api_cdek' )
function fetch_api_cdek( $args ) {

    $location_args = array(
        "country" => "Россия",
        "city" => "Москва",
    );

    function get_location_info($location_args){
      return  wp_safe_remote_post( 'https://api.cdek.ru/v2/location/cities', array(
            'timeout'	=> 10,
            'sslverify'	=> is_ssl(),
            'blocking'	=> true,
            // 'cookies'   => $_COOKIE,
            'headers'	=> array(
                'Content-Type' => 'application/json',
                'Authorization'	=> sprintf( 'Bearer %s', WC()->integrations->get_integration( 'edostavka-integration' )->get_access_token() )
            ),
            'body'		=> json_encode( $location_args )
            )
        );
    }

    // $response_location = get_location_info( $location_args );
    // $result_location = json_decode( wp_remote_retrieve_body( $response_location ), true );
	//  wc_add_notice( sprintf( '<pre>%s</pre>', wc_print_r( $result_location, true ) ) );


    function get_location_delivery_details(){

        // 'date'			=>  date('Y-d-m') . 'T' . date('G:i:s') . '+0700',
        // 'currency'		=> get_woocommerce_currency(),
        $args_delivery = array(
            'tariff_code'	=> 1,
            'from_location'	=> array(
                'code'	=> 270
            ),
            'to_location'	=> array(
                'code'	=> 44,
            ),
            'packages'		=> array(
                "height" =>  10,
                "length" =>  10,
                "weight" =>  1000,
                "width"  => 10
            ),
            'services'		=> array()
        );

        $url = 'https://api.cdek.ru/v2/calculator/tariff';
        $args = array(
            'timeout'	=> 5,
            'redirection' => 5,
            'sslverify'	=> is_ssl(),
            'blocking'	=> true,
            'httpversion' => '1.0',
            'cookies'   => $_COOKIE,
            'headers'	=> array(
                'Content-Type' => 'application/json',
                'Authorization'	=> sprintf( 'Bearer %s', WC()->integrations->get_integration( 'edostavka-integration' )->get_access_token() )
            ),
            'body'		=> json_encode($args)
        );

        $response = wp_remote_post( $url, $args );
        return  $response;
    }

    echo '13456789'; 

    // $token = WC()->integrations->get_integration( 'edostavka-integration' )->get_access_token();

    // $response = get_location_delivery_details( $args );
    // $result = json_decode( wp_remote_retrieve_body( $response ), true );
    // wc_add_notice( sprintf( '<pre>%s</pre>', wc_print_r(  $result, true ) ) );
} 


// add_action( 'woocommerce_before_checkout_form', 'get_citys' );
function get_citys(){
    $curl = curl_init();

    $postFieldsAr = array(
        "grant_type" => "client_credentials",
        "client_id" => 'qXlFYrvYphHGteqtvkqM5zCXhqylF5yZ',
        "client_secret" => 'oG3H2BwoZKBkpDp39XIxkSRkgdTHbUx9'
    );

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.cdek.ru/v2/oauth/token",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($postFieldsAr)
    ));

    $result = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($result, true);


    $args = array(
        'tariff_code'	=> 1,
        'from_location'	=> array(
            'code'	=> 270
        ),
        'to_location'	=> array(
            'code'	=> 44,
        ),
        'packages'		=> array(
            "height" => 10,
            "length" => 10,
            "weight" => 1000,
            "width"  => 10
        ),
        'services'		=> array()
    );

    $curl = curl_init(); 
    curl_setopt_array($curl, array(
        CURLOPT_HTTPHEADER => array('Authorization: Bearer '. $result["access_token"]),
        CURLOPT_URL => "https://api.cdek.ru/v2/calculator/tariff",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_POST => true,
        CURLOPT_HEADER => false,
        CURLOPT_POSTFIELDS => http_build_query($args)
    ));



    $result = curl_exec($curl);
    $data = json_decode($result, true); 
    curl_close($curl);

    wc_add_notice( sprintf( '<pre>%s</pre>', wc_print_r( $data, true ) ) );
}