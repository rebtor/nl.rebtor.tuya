# Tuya devices homey app🌧 🔌

A implementation of [TuyAPI] (https://github.com/codetheweb/tuyapi/) for use with homey. 

## CHANGELOG
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


## DEVICES
- NEO Coolcam 2000 watt smartplug
- NEO Coolcam 3600 watt smartplug
- LSC Smart LED light Strip (action)
- LSC smart power plug (action)

