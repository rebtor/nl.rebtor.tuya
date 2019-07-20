# Tuya devices homey app🌧 🔌

A implementation of [TuyAPI] (https://github.com/codetheweb/tuyapi/) for use with homey. 

## CHANGELOG

* 1.0.0
	- Initial version with support for NEO Coolcam smartplug 2000W

## Basic Usage
See the [setup instructions](https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md) for how to find the needed parameters.

Once these parameters (ID and Key) are known you can use this information to create a device in homey to communicate with the Tuya cloud network without the use of IFTT.

Warning: This app is not plug and play finding the ID and Key needed tot communicate with the tuya cloud takes some doing. 

## 📝 Notes
- Only one TCP connection can be in use with a device at once. If using this, do not have the app on your phone open.
- Some devices ship with older firmware that may not work with `tuyapi`.  If you're experiencing issues, please try updating the device's firmware in the official app.
- I think other smartplugs from tuya may work to with this app. The 3600 watt version from NEO Coolcam is on its way from China.

## DEVICES
- NEO Coolcam 2000 watt smartplug

