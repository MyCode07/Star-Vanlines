
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// новоая донастройка доставки
add_filter( 'wc_edostavka_delivery_rates_item', function( $rate_atts, $rate, $package, $shipping_class ) {
	
	if( in_array( $shipping_class->get_instance_id(), array( 112, 113 ), true ) ) {
		return $rate_atts;
	}
	
	$customer_locations = wc_edostavka_shipping()->get_customer_handler();
	
	if( in_array( $customer_locations->get_region_code(), array( 9, 81, 82, 26 ), true ) && $package['contents_cost'] >= 2500 ) {
		//Если это Москва, МО, СПБ или ЛО, то устанавливаем бесплатную доставку от 2500 руб.
		$rate_atts['cost'] = 0;
	} elseif( $package['contents_cost'] >= 4000 ) {
		//Иначе для всех остальных городов и регионов устанавливаем бесплатную доставку от 4000 руб.
		$rate_atts['cost'] = 0;
	}
	
	$tariff_data = WC_Edostavka_Tariffs_Data::get_tariff_by_code( $shipping_class->get_option( 'tariff' ) );
	$is_to_door = in_array( $tariff_data['type'], array( 'door_door', 'stock_door' ), true );
	
	if( $is_to_door ) {
		if( in_array( $customer_locations->get_region_code(), array( 9, 81 ), true ) ) {
			$rate_atts['label'] = 'Курьером по Москве и Московской обл.'; //назовите метод доставки как вам нужно для Москвы и МО
		} elseif( in_array( $customer_locations->get_region_code(), array( 82, 26 ), true ) ) {
			$rate_atts['label'] = 'Курьером по СПБ и ЛО.'; //назовите метод доставки как вам нужно для СПБ и ЛО
		}
	} else {
		if( in_array( $customer_locations->get_region_code(), array( 9, 81 ), true ) ) {
			$rate_atts['label'] = 'До ПВЗ (СДЭК) по Москве и Московской обл.'; //назовите метод доставки как вам нужно для Москвы и МО
		} elseif( in_array( $customer_locations->get_region_code(), array( 82, 26 ), true ) ) {
			$rate_atts['label'] = 'До ПВЗ (СДЭК) по СПБ и ЛО.'; //назовите метод доставки как вам нужно для СПБ и ЛО
		}
	}
	
	if( $rate_atts['cost'] == 0 ) {
		$rate_atts['label'] .= ' (Бесплатно)';
	}
	
	return $rate_atts;
}, 10, 4 );

