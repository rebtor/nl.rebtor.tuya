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
		console.log('Connected to device!');
		connectedd = true
		});

		APIdevice.on('disconnected', () => {
		console.log('Disconnected from device.');
		connectedd = false
		APIdevice.find().then(() => {
		APIdevice.connect();
	});
	});

		APIdevice.on('error', error => {
		console.log('Error!', error);
		});

		APIdevice.on('data', data => {
		
		//console.log('Data from device:', data);
		//console.log('Data 1', Boolean(data.dps['1']));
		//console.log('Data 18',Boolean(data.dps['18']));
		//console.log('Data 19',Boolean(data.dps['19']));
		//console.log('Data 20',Boolean(data.dps['20']));
		
		var count = 0
		
		if (Boolean(data.dps['1'])) {
		device.setCapabilityValue('onoff', data.dps['1'])
		} else {count = count + 1}; 
		if (Boolean(data.dps['18'])) {
		device.setCapabilityValue('measure_current', 0+(data.dps['18']/1000))
		} else {count = count + 1}; 
		if (Boolean(data.dps['19'])) {
		device.setCapabilityValue('measure_power', 0+(data.dps['19']/10))
		} else {count = count + 1}; 
		if (Boolean(data.dps['20'])) {
		device.setCapabilityValue('measure_voltage', 0+(data.dps['20']/10))
		} else {count = count + 1};	
		console.log(count);
		
		if (count == 1) {
		device.setCapabilityValue('onoff', true)};
		if (count == 4) {
		device.setCapabilityValue('onoff', false)
		} 
		});
		



	device.registerCapabilityListener('onoff', async ( value ) => {
	device.log('value', value);
	return APIdevice.set({set: value})
	.catch( err => {
		console.error(err);
		});
	});

	
	
// Disconnect after 10 seconds

 
}

module.exports = TuyaDevice;