# JavaScript Example Apps for Kontakt.io Beacons

This repository contains example app for the Cordova Kontakt.io plugin. (TODO: Add link)

## Overview of examples

* Kontakt.io Beacons - Ranges for beacons and displays proximity, RSSI, and beacon major/minor values. (TODO: Add link)

* Kontakt.io Monitor - Monitors for region enter/exit events, displays notifications in the background. (TODO: Add link)

More information and instructions for how to build the apps are given in the README file for each app (follow links above).

## Use Evothings Studio for a fast workflow

Learn how to use Evothings Studio to develop Cordova apps with live-reload-on-save. What you do is that you simply hook up your Cordova app to connect to Evothings Workbench by modifying config.xml. Then drag index.html into the Workbench project list and click RUN. Now live reload is enabled!

Here is a step-by-step guide:

* Download and run Evothings Workbench on your computer.

* Open the file config.xml in your Cordova project folder. Edit the content tag to refer to the connect URL displayed at the bottom of the Evothings Workbench project window. This will make the app connect to the Workbench when launched.

* Here is an example (use actual IP-address displayed in the Workbench window):

    <content src="http://192.168.43.131:4042" />

* Build the app using the following command and run the app on your phone/tablet:

    cordova build ios

* Drag and drop the file www/index.html to the Workbench project list.

* Click RUN in the Workbench window. You now have live reload
enabled, just save the code in your editor and the app reloads.

**Make sure your computer and phone/tablet are on a WiFi network
that allows connections (client isolation must be off).**

To make it easy to switch between building the production version of the app and the development version that connects to Evothings Workbench you can modify the content tag name and have both tags side by side:

    <xcontent src="index.html" />
    <content src="http://192.168.43.131:4042" />

To learn more read these articles and tutorials:

[Setup Cordova for Evothings Workbench](http://evothings.com/doc/build/cordova-guide.html)

[Cordova IoT Starter Kit](http://evothings.com/cordova-starter-kit/)

[Hybrid app development made fast](http://evothings.com/hybrid-app-development-made-fast/)

[Evothings Studio Starter Kit](http://evothings.com/evothings-studio-starter-kit/)
