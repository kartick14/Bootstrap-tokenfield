<?php
require('../../../wp-load.php');
global $wpdb;
if(isset($_GET['action']) && $_GET['action'] == 'sponsor_dmr_search'){
  $options_array = $wpdb->get_results("SELECT dma,monthly_price FROM ".$wpdb->prefix.'local_sponsor_prices'." WHERE `dma` LIKE '%".$_GET['q']."%'", ARRAY_A);

		$args = array(
            'post_type'  => 'sponsor-ad',
            'post_status' => array( 'publish' ), 
            'posts_per_page' => -1,            
            'meta_query' => array(
              'relation' => 'AND',
              array(
                'key'     => 'sponsor_ad_status',
                'value'   => 'sponsor_active',
                'compare' => '=',
              ),
              array(
                'key'     => 'sponsor_dmr_county_list',
                'value'   => $options_array['dma'],
                'compare' => 'LIKE',
              ),                 
            ),
          );
          $sponsor_query = new WP_Query( $args );
          
          $count_sponsor = $sponsor_query->found_posts;
          $options_array[]['sponsor_cnt'] = $count_sponsor;
          wp_reset_query($sponsor_query);
          
	 echo json_encode($options_array);
}
?>
