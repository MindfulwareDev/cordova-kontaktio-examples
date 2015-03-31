var app = (function()
{
	// Application object.
	var app = {};

	// Dictionary of beacons.
	var foundBeacons = {};

	// Timer that displays list of beacons.
	var updateTimer = null;

	app.initialize = function()
	{
		document.addEventListener('deviceready', onDeviceReady, false);
	};

	function onDeviceReady()
	{
		// Start tracking beacons!
		startMonitoringBeacons();

		// Display refresh timer.
		updateTimer = setInterval(displayBeaconList, 1000);
	}

	function startMonitoringBeacons()
	{
		function onBeaconsRanged(beacons)
		{
			//console.log('onBeaconsRanged: ' + JSON.stringify(beacons))
			for (var i in beacons)
			{
				// Insert beacon into table of found beacons.
				// Filter out invalid RSSI values.
				var beacon = beacons[i];
				if (beacon.rssi < 0)
				{
					beacon.timeStamp = Date.now();
					var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
					foundBeacons[key] = beacon;
				}
			}
		}

		function onError(errorMessage)
		{
			console.log('Ranging beacons did fail: ' + errorMessage);
		}

		// Start ranging beacons.
		kontaktio.startMonitoringBeacons(
			[{}], // Empty region matches all Kontakt.io beacons with factory set UUID.
			onBeaconsRanged,
			function(region) { /* Not used */ },
			function(region) { /* Not used */ },
			onError);
	}

	function displayBeaconList()
	{
		// Clear beacon list.
		$('#found-beacons').empty();

		var timeNow = Date.now();

		// Update beacon list.
		$.each(foundBeacons, function(key, beacon)
		{
			// Only show beacons that are updated during the last 20 seconds.
			if (beacon.timeStamp + 20000 > timeNow)
			{
				// Create tag to display beacon data.
				var element = $(
					'<li>'
					// Uncomment line to display UUID.
					//+	'UUID: ' + beacon.uuid + '<br />'
					+	'Major: ' + beacon.major + '<br />'
					+	'Minor: ' + beacon.minor + '<br />'
					+	proximityHTML(beacon)
					+	distanceHTML(beacon)
					+	rssiHTML(beacon)
					+ '</li>'
				);

				$('#found-beacons').append(element);
			}
		});
	}

	function proximityHTML(beacon)
	{
		var proximity = beacon.proximity;
		if (!proximity) { return ''; }

		var proximityNames = [
			'Unknown',
			'Immediate',
			'Near',
			'Far'];

		return 'Proximity: ' + proximityNames[proximity] + '<br />';
	}

	function distanceHTML(beacon)
	{
		var meters = beacon.accuracy;
		if (!meters) { return ''; }

		var distance
		if (meters < 0)
			distance = '?';
		else if (meters > 1)
			distance = meters.toFixed(2) + ' m';
		else
			distance = (meters * 100).toFixed(0) + ' cm';

		return 'Distance: ' + distance + '<br />'
	}

	function rssiHTML(beacon)
	{
		// Map the RSSI value to a width in percent for the indicator.
		var rssiWidth = 1; // Used when RSSI is zero or greater.
		if (beacon.rssi < -100) { rssiWidth = 100; }
		else if (beacon.rssi < 0) { rssiWidth = 100 + beacon.rssi; }
		// Scale values since they tend to be a bit low.
		rssiWidth *= 1.5;

		var html =
			'RSSI: ' + beacon.rssi + '<br />'
			+ '<div style="background:rgb(0,50,200);height:20px;width:'
			+ 		rssiWidth + '%;"></div>'

		return html;
	}

	return app;
})();

app.initialize();
