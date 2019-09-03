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

		Tuyadevicedata(this)		
	}	
};

function Tuyadevicedata(device_data) { 

 var device = device_data;

		// Get device settings 
	    var APIdevice = new TuyAPI({
		id: device.getSetting('ID'),
		key: device.getSetting('Key'),
		ip: device.getSetting('IP'),
		schema: true});

		var connectedd = false
		
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
		connectedd = true
		device.setAvailable();
		});

		APIdevice.on('disconnected', () => {
		devicelog('Disconnected from device.');
		connectedd = false
		device.setUnavailable();
		APIdevice.find().then(() => {
		APIdevice.connect();
		});
		});

		APIdevice.on('error', error => {
		devicelog('Error!', error);
		});

		APIdevice.on('data', data => {
		
		if(data.dps.hasOwnProperty('1') == true) 
			{
				device.setCapabilityValue('onoff', data.dps['1'])
				.catch( err => {
				console.error(err);
				});
			}
		
		if(data.dps.hasOwnProperty('18') == true) 
			{
				device.setCapabilityValue('measure_current', data.dps['18']/1000)
				.catch( err => {
				console.error(err);
				});
			}
		
		if(data.dps.hasOwnProperty('19') == true) 
			{
				device.setCapabilityValue('measure_power', data.dps['19']/10)
				.catch( err => {
				console.error(err);
				});
			}
		
		if(data.dps.hasOwnProperty('20') == true) 
			{
				device.setCapabilityValue('measure_power', data.dps['20']/10)
				.catch( err => {
				console.error(err);
				});
			}		

		});
		
	device.registerCapabilityListener('onoff', async ( value ) => {
	devicelog('Device value: ', value);
	return APIdevice.set({set: value})
	.catch( err => {
		console.error(err);
		});
	});

}

module.exports = TuyaDevice;