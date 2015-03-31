var app = (function()
{
	// Application object.
	var app = {};

	// History of enter/exit events.
	var mEvents = [];

	// Background flag.
	var mAppInBackground = false;

	// Background notification id counter.
	var mNotificationId = 0;

	// Here monitored regions are defined.
	// TODO: Update with uuid/major/minor for your beacons.
	// You can add as many beacons as you want to use.
	// UUID used here is the Kontakt.io factory setting.
	var mRegions =
	[
		{
			uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
			major: 5662,
			minor: 53377
		},
		{
			uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
			major: 60378,
			minor: 22122
		},
		/*,
		{
			uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e'
		}*/
	];

	// Region data is defined here. Mapping used is from
	// major/minor to a string. You can adapt this to your
	// own needs, and add other data to be displayed.
	// TODO: Update with major/minor for your own beacons.
	var mRegionData =
	{
		'60378:22122': 'Region One',
		'5662:53377': 'Region Two'
	};

	app.initialize = function()
	{
		document.addEventListener('deviceready', onDeviceReady, false);

		document.addEventListener('pause', function() {
			// App has gone to background.
			mAppInBackground = true;
		 });

		document.addEventListener('resume', function() {
			// App is in foreground.
			mAppInBackground = false;
			displayEvents();
		});
	};

	function onDeviceReady()
	{
		startMonitoringBeacons();
		displayEvents();
	}

	function startMonitoringBeacons()
	{
		function onEnterRegion(region)
		{
			saveEvent('Enter', region);
			displayRecentEvent();
		}

		function onExitRegion(region)
		{
			saveEvent('Exit', region);
			displayRecentEvent();
		}

		function onError(errorMessage)
		{
			console.log('Monitoring beacons did fail: ' + errorMessage);
		}

		// Start monitoring beacons.
		kontaktio.startMonitoringBeacons(
			//[{}], //
			mRegions,
			function(beacons) { /* Not used */ },
			onEnterRegion,
			onExitRegion,
			onError);
	}

	function saveEvent(eventType, region)
	{
		// Save event.
		mEvents.push(
		{
			type: eventType,
			time: getTimeNow(),
			region: region
		});

		// Truncate if more than ten entries.
		if (mEvents.length > 10)
		{
			mEvents.shift();
		}
	}

	function displayRecentEvent()
	{
		if (mAppInBackground)
		{
			// Set notification title.
			var event = mEvents[mEvents.length - 1];
			var title = event.time + ': ' + event.type + ' ' + getRegionData(event.region);

			// Create notification.
			cordova.plugins.notification.local.schedule({
    			id: ++mNotificationId,
    			title: title
  			});
		}
		else
		{
			displayEvents();
		}
	}

	function displayEvents()
	{
		// Clear list.
		$('#events').empty();

		// Update list.
		for (var i = mEvents.length - 1; i >= 0; --i)
		{
			var event = mEvents[i];
			var title = event.time + ': ' + event.type + ' ' + getRegionData(event.region);

			var element = $(
				'<li>'
				+ '<strong>' + title + '</strong>'
				+ '</li>'
				);

			$('#events').append(element);
		}

		// If the list is empty display a help text.
		if (mEvents.length <= 0)
		{
			var element = $(
				'<li>'
				+ '<strong>'
				+	'Waiting for events, please move into or out of a beacon region. '
				+	'You need to update variables mRegions and mRegionData in file '
				+	'app.js to make the app work with your beacons.'
				+ '</strong>'
				+ '</li>'
				);
			$('#events').append(element);
		}
	}

	function getRegionData(region)
	{
		return mRegionData[region.major + ':' + region.minor];
	}

	function getTimeNow()
	{
		function pad(n)
		{
			return (n < 10) ? '0' + n : n;
		}

		function format(h, m, s)
		{
			return pad(h) + ':' + pad(m)  + ':' + pad(s);
		}

		var d = new Date();
		return format(d.getHours(), d.getMinutes(), d.getSeconds());
	}

	return app;

})();

app.initialize();
