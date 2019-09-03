'use strict';

const Homey = require('homey');
const TuyAPI = require('tuyapi');
var device = {};
var logging = false;

function devicelog(title, log) 
	{
	if(logging == true) 
		{ 
		console.log(title, log);
		}
	};

class TuyaDevice extends Homey.Device {
	
onInit() {
		this.log('MyDevice has been inited');
		this.log('name:', this.getName());

		//Tuyadevicedata(this);
		
		Tuyadevicedata(this)		
	}	
};


function Tuyadevicedata(device_data) { 

 var device = device_data;

 // Get device settings 
	    var APIdevice = new TuyAPI({
		id: device.getSetting('ID'),
		key: device.getSetting('Key'),
		ip: device.getSetting('IP')});

		
		// Find device on network
		APIdevice.find().then(() => {
		// Connect to device
		APIdevice.connect().catch( err => {
		console.error(err);
		});
		})
		.catch( err => {
		console.error(err);
		
		});

		// Add event listeners
		APIdevice.on('connected', () => {
		devicelog('Connected to device!');
		device.setAvailable();
		});

		APIdevice.on('disconnected', () => {
		devicelog('Disconnected from device.');
		APIdevice.find().then(() => {
		// Connect to device
		APIdevice.connect();
	});
	});

		APIdevice.on('error', error => {
		devicelog('Error!', error);
		device.setUnavailable();
			setTimeout(() => 
					{ 
						devicelog('Reconnecting!!');
						// Find device on network
						APIdevice.find().then(() => {
						// Connect to device
						APIdevice.connect().catch( err => {
						Console.error(err);
						});
						})
						.catch( err => {
						console.error(err);
						});
					}
					, 10000);		
		});

		APIdevice.on('data', data => {
		// devicelog('Data from device:', data);
		if(data.dps.hasOwnProperty('1') == true) 
			{
				device.setCapabilityValue('onoff', data.dps['1'])
				.catch( err => {
				console.error(err);
				});
			}
		});


	device.registerCapabilityListener('onoff', async ( value ) => {
	//device.log('value', value);
	return APIdevice.set({set: value})
	.catch( err => {
		console.error(err);
		});
	});

//Disconnect after 10 seconds
setTimeout(() => { APIdevice.disconnect(); }, 50000);
 
}

module.exports = TuyaDevice;