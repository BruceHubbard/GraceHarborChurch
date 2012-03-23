var ghCommon = {
	drawMap: function(container) {
		var churchCoords = new google.maps.LatLng(39.420961,-84.362703);
		var mapCenter = new google.maps.LatLng(39.425961, -84.362703);
		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();
		
	    var myOptions = {
	        center: mapCenter,
	        zoom: 14,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };      
	    
		var map = new google.maps.Map(document.getElementById(container), myOptions);
		
	    var marker = new google.maps.Marker({
	        position: churchCoords,
	        map: map,
	        title:"Grace Harbor Church"
	    });
	    
		var infowindow = new google.maps.InfoWindow({
	        content: '<div id="content" class="infobox">'+
	    				'<h2 id="firstHeading" class="firstHeading">Grace Harbor Community Church</h2>'+
	    				'<div id="bodyContent">Join us on Sunday mornings at 11am</div>'+
					 	'<div class="directions"><br/><br/>' +
						'<input class="address" placeholder="Enter your address"/><input class="submit" type="submit" value="Get Directions"/>' +
						'</div>' +
	    			'</div>'});
	
	      google.maps.event.addListener(marker, 'click', function() {
	        infowindow.open(map,marker);
	      });
	
		google.maps.event.trigger(marker, 'click');
		
		$("#" + container).on('click', '.infobox input.submit', function() {
			var address = $('.infobox input.address').val();
			directionsService.route({
										origin: address, 
										destination: churchCoords,
										travelMode: google.maps.TravelMode.DRIVING
										}, 
									function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
		});
		
		directionsDisplay.setMap(map);
	}
};