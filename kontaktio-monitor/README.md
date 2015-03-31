# Kontakt.io Monitor Example App

This is an example app that shows how to monitor region enter/exit events.

Background notifications are supported. Notifications are displayed using the plugin [cordova-plugin-local-notifications](https://github.com/katzer/cordova-plugin-local-notifications).

## How the app was created

The Cordova project for the example was created with this command:

    cordova create kontaktio-monitor com.evothings.kontaktiomonitor Monitor

This was added to the config.xml file to prevent bounce on scrolling:

    <preference name="DisallowOverscroll" value="true" />

Then the files in folder www were deleted and replaced by the example app files.

To build the app follow the steps below.

## What you need to modify before the app will work

Open file www/app.js and edit the variables mRegions and mRegionData to contain the UUIDs and major/minor values of your beacons.

## Cordova commands to build the app

To build the app do the following steps.

You need to have Apache Cordova installed. The [Cordova IoT Starter Kit](http://evothings.com/cordova-starter-kit/) helps to get up and running.

Open a command window and go to the app folder, by e.g.:

    cd cordova-kontaktio-examples/kontaktio-monitor

Add plugins (this step is done once):

    cordova plugin add ../../cordova-kontaktio-plugin (TODO: replace with GitHub URL)
    cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications#0.8.1

Add platform iOS (also done once):

    cordova platform add ios

Build the app (do this after each code update):

    cordova build ios

You may get this error, which can be ignored:

    The following build commands failed:
	    Ld build/emulator/Monitor.app/Monitor normal i386
    (1 failure)

Now open the Xcode project in folder platforms/ios to deploy and run the app.

## Use Evothings Studio for a fast workflow

Learn more about how to develop your app with Evothings Studio and live reload in the README file in this project. (TODO: Add link)



