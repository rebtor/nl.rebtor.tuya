'use strict';

const Homey = require('homey');
const TuyAPI = require('tuyapi');
var device = {};

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
		key: device.getSetting('Key')});

		
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
		console.log('Connected to device!');
		});

		APIdevice.on('disconnected', () => {
		console.log('Disconnected from device.');
		APIdevice.find().then(() => {
		// Connect to device
		APIdevice.connect();
	});
	});

		APIdevice.on('error', error => {
		  console.log('Error!', error);
		});

		APIdevice.on('data', data => {
		console.log('Data from device:', data);
		device.setCapabilityValue('onoff', data.dps['1'])
		.catch( err => {
		console.error(err);
		});
		});


	device.registerCapabilityListener('onoff', async ( value ) => {
	device.log('value', value);
	return APIdevice.set({set: value})
	.catch( err => {
		console.error(err);
		});
	});

// Disconnect after 10 seconds
//setTimeout(() => { APIdevice.disconnect(); }, 50000);
 
}

module.exports = TuyaDevice;