<?php


/*

Функция get_location_delivery_details()  —  получет информацию о доставке от исходного города в другой,
и работает как надо,

а вот функция get_location_info() — который  должен получить информацию о городе, возвращает ответ — Method not allowed

функцией get_location_info() я пытаюсь получить код города чтобы потом передать коф города в аргументы get_location_delivery_details() и плучить детали о доставке

в чем проблема не могу понять?

сайт на wordpress woocommerce 


*/

add_action( 'woocommerce_before_checkout_form', 'fetch_api_cdek' );

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

    $response_location = get_location_info( $location_args );
    $result_location = json_decode( wp_remote_retrieve_body( $response_location ), true );
	//  wc_add_notice( sprintf( '<pre>%s</pre>', wc_print_r( $result_location, true ) ) );

    
    $args = array(
        // 'date'			=>  date('Y-d-m') . 'T' . date('G:i:s') . '+0700',
        // 'currency'		=> get_woocommerce_currency(),
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

    function get_location_delivery_details($args){
      return  wp_safe_remote_post( 'https://api.cdek.ru/v2/calculator/tariff', array(
            'timeout'	=> 10,
            'sslverify'	=> is_ssl(),
            'blocking'	=> true,
            // 'cookies'   => $_COOKIE,
            'headers'	=> array(
                'Content-Type' => 'application/json',
                'Authorization'	=> sprintf( 'Bearer %s', WC()->integrations->get_integration( 'edostavka-integration' )->get_access_token() )
            ),
            'body'		=> json_encode( $args )
            )
        );
    }

    $response = get_location_delivery_details( $args );
    $result = json_decode( wp_remote_retrieve_body( $response ), true );
		// wc_add_notice( sprintf( '<pre>%s</pre>', wc_print_r( $result, true ) ) );
} 