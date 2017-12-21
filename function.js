//include js : jquery-ui.js, bootstrap-tokenfield.min.js and typeahead.bundle.min.js
// include css: jquery-ui.css, bootstrap-tokenfield.min.css and tokenfield-typeahead.min.css

jQuery(document).ready(function () {
	/*----------------------------------- Sponsor AD Section Start --------------------------------------*/
	var API_URL = '<?php echo get_stylesheet_directory_uri()?>/sponsor_ajax.php';
	var engine = new Bloodhound({
		remote: {
			url: API_URL + '?action=sponsor_dmr_search&q=%QUERY',
			filter: function (response) { //console.log(response);
				var tagged_user = jQuery('#dmr_county_id').tokenfield('getTokens'); //console.log(tagged_user);
				return jQuery.map(response, function (user) {
					var exists = false;
					for (i = 0; i < tagged_user.length; i++) {
						if (user.dma == tagged_user[i].label) {
							var exists = true;
						}
					}
					if (!exists) {
						return {
							value: user.monthly_price,
							label: user.dma
						};
					}
				});
			}
		},
		datumTokenizer: function (d) {
			return Bloodhound.tokenizers.whitespace(d.label);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace
	});
	engine.initialize();
	jQuery('#dmr_county_id').tokenfield({
		typeahead: [{
				hint: false
			},
			{
				name: 'users',
				displayKey: 'label',
				source: engine.ttAdapter()
			}
		]
	});	

});
