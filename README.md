# Tuya devices homey app🌧 🔌

A implementation of [TuyAPI] (https://github.com/codetheweb/tuyapi/) for use with homey. 

## CHANGELOG
* 3.1.1
	- Small changes to readme
* 3.1.0
	- Deprecated all non generic devices. Updated images to fit appstore requirements
* 3.0.0
	- Homey pro 2023 ready, added automated discovery for generic devices (fill in the settings page), NEO, and LSC strip are now deprecated use the generic devices. 
* 2.1.4
	- Fixed crash with multisocket devices
* 2.1.3
	- Fixed crash with multisocket devices
* 2.1.2
	- I did forget to merge the generic shutter device from SDK 2 to SDK 3 version
* 2.1.1
    Fixed the mixup between LSC_SMART_POWER_PLUG and LSC_SMART_LED_STRIP
 2.1.0
	- Revert to SDK 3
* 2.0.2
    - Fix on / off ledstrip and usage of homey composer
* 2.0.1
    - Updated TuyApi libery"
* 2.0.0
    - SDK 3 and Homey 5.0.0 support
* 1.2.0
	- SDK update and making the app ready for 5.0.0 + 
* 1.1.4 
	- It is now possible to specify what version of the tuya protocol you want to use (default remains 3.1)	
* 1.1.3
	- Bugfixes for shutter switch
* 1.1.2 (Alpha version)
	- Bugfixes for shutter switch
* 1.1.1
	- Added support for Anccy shutter timer switch (shutterdevice) 
* 1.1.0
	- Version 3.0.0 support
	- Implemented energy property's
	- Formatted the code
* 1.0.9
	- Fixed small bug controlling socket 4 off AOFO_WiFi_Smart_Power_Strip
	- Added flowcharts for individual sockets 1 t/m 4 and usb ports
* 1.0.8 
	- Added support for AOFO WiFi Smart Power Strip
* 1.0.7
	- Fixed icon of LSC Smart Filement LED (action)
	- Added logging for data atribute 
* 1.0.6 
	- Added support for LSC Smart Filement LED (action)
* 1.0.5
	- Fixed crash because dataobject was invalid / undefined. 
* 1.0.4
	- Optimized and centralized code.  
	- Updated TuyAPI to version 5.1.3 
* 1.0.3
	- Added support for LSC Smart LED light Strip (action)	and LSC smart power plug (action)
	- Optimized data processing from devices
* 1.0.2
	- Added check on ID or IP and key when adding device. 
* 1.0.1
	- Added support for NEO Coolcam smartplug 3600W
	- You can now use IP instead of ID to connect devices
* 1.0.0
	- Initial version with support for NEO Coolcam smartplug 2000W

## Known issues
* recovery from powerloss can crash the app. 
* Setup (getting the key) procedure does not work on some IOS devices. See https://github.com/codetheweb/tuyapi/issues/215 for possible solutions. 
* Entering a wrong key can make the app crash. 
	
## Community request
* Can anyone test if the LED strip device also work for the LED lamps from action to. Then i wil add them.  
	
## Basic Usage
See the [setup instructions](https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md) for how to find the needed parameters.

Once these parameters (ID and Key) are known you can use this information to create a device in homey to communicate with the Tuya cloud network without the use of IFTT.

Warning: This app is not plug and play finding the ID and Key needed tot communicate with the tuya cloud takes some doing. 

## 📝 Notes
- Only one TCP connection can be in use with a device at once. If using this, do not have the app on your phone open.
- Some devices ship with older firmware that may not work with `tuyapi`.  If you're experiencing issues, please try updating the device's firmware in the official app.




