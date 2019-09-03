'use strict';

// Constanten
const Homey = require('homey');
const TuyAPI = require('tuyapi');
var device = {};
var logging = false ;

// Functie om decimals om te zetten naar hex. 
function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
};

function devicelog(title, log) 
	{
	if(logging == true) 
		{ 
		console.log(title, log);
		}
	};

// start device
class TuyaDevice extends Homey.Device {
onInit() {
		devicelog('Device: ','RGB Device has been inited');
		devicelog('Device name:', this.getName());
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

		APIdevice.sendvalues = function (value, parameter) {
		
		var onoff = device.getCapabilityValue('onoff');
		var dim = Math.round(device.getCapabilityValue('dim') * 1000);
		var light_hue = Math.round(device.getCapabilityValue('light_hue') * 360);
		var light_saturation = Math.round(device.getCapabilityValue('light_saturation') * 1000);
		var light_mode = device.getCapabilityValue('light_mode');
		
		var dimhex = decimalToHex(dim, 3);
		var huehex = decimalToHex(light_hue, 3);
		var sathex = decimalToHex(light_saturation, 3);
		
		var colorcode = ('0'+huehex+'0'+sathex+'0'+dimhex);
		
		if (parameter == 'onoff') 
		
		{
				return APIdevice.set({set: value})
				.catch( err => {
				console.error(err);
				});
		}		
		else if (parameter == 'dim' && light_mode == 'temperature')
		{
				devicelog('Device: ','zet wit dimmer');
				var dimvalue = value * 1000;
				devicelog('Device: ', 'dim to value');
				return APIdevice.set({dps: 22, set: dimvalue})
				.catch( err => {
				console.error(err);
				});	
		}
		else if (parameter == 'dim' && light_mode == 'color')
		{		
				var setvalue = Math.round(value * 1000); 
				var dimhex = decimalToHex(setvalue, 3);
				var colorcode = ('0'+huehex+'0'+sathex+'0'+dimhex);
				devicelog('colorcode set: ', colorcode);
				return APIdevice.set({
								multiple: true,
								data: {
									21: 'colour',
									24: colorcode,
									25: colorcode
								}})
				.catch( err => {
				console.error(err);
				});	
		}
		else if (parameter == 'hue')
		{		
				var setvalue = Math.round(value * 360); 
				var huehex = decimalToHex(setvalue, 3);
				var colorcode = ('0'+huehex+'0'+sathex+'0'+dimhex);
				devicelog('colorcode set: ', colorcode);
				return APIdevice.set({
								multiple: true,
								data: {
									21: 'colour',
									24: colorcode,
									25: colorcode
								}})
				.catch( err => {
				console.error(err);
				});	
		}
		else if (parameter == 'light_saturation')
		{		
				var setvalue = Math.round(value * 1000); 
				var sathex = decimalToHex(setvalue, 3);
				var colorcode = ('0'+huehex+'0'+sathex+'0'+dimhex);
				devicelog('colorcode set: ', colorcode);
				return APIdevice.set({
								multiple: true,
								data: {
									21: 'colour',
									24: colorcode,
									25: colorcode
								}})
				.catch( err => {
				console.error(err);
				});	
		}
		else if (parameter =='colormode')
		{
			if (value == 'temperature') 
							{
								return APIdevice.set({dps: 21, set: 'white'})
								.catch( err => {
								console.error(err);
								});
							}
			else 
				{
							return APIdevice.set({
										multiple: true,
										data: 	{
												21: 'colour',
												24: 'colorcode',
												25: 'colorcode'
												}
											}).catch( err => {console.error(err);});				
			}
		}
		};
		
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
		devicelog('Device', 'Connected to device!');
		device.setAvailable();
		});

		APIdevice.on('disconnected', () => {
		devicelog('Device', 'Disconnected from device.');
		APIdevice.find().then(() => {
		// Connect to device
		APIdevice.connect();
	});
	});

		APIdevice.on('error', error => {
			devicelog('Error: ', error);
			device.setUnavailable();
			setTimeout(() => 
					{ 
						devicelog('Device: ', 'Reconnecting!!');
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

		APIdevice.on('data', data => 	{
											devicelog('Data from device:', data);

											// verwerk onoff
											if(data.dps.hasOwnProperty('20') == true) 
											{
												device.setCapabilityValue('onoff', data.dps['20'])
												.catch( err => {
												console.error(err);
												});
											}
											if(data.dps.hasOwnProperty('22') == true) 
											{
												device.setCapabilityValue('dim', data.dps['22']/1000)
												.catch( err => {
												console.error(err);
												});
											}
											// verwerk lightmode
											if(data.dps.hasOwnProperty('21') == true) 
											{
												if(data.dps['21'] == 'colour') 
													{
													devicelog('colormode:', 'color');	
													var mode = 'color';
													}
												else
													{
													devicelog('colormode:', 'temperature');	
													var mode = 'temperature';
													}
												device.setCapabilityValue('light_mode', mode)
												.catch( err => {
												console.error(err);
												});
											}											
											// verwerk parameter 24 kleur
											if(data.dps.hasOwnProperty('24') == true) 
											{
												var colorstring = data.dps['24'];
												
												var huehex =  colorstring.substring(1,4);
												var sathex =  colorstring.substring(5,8);
												var dimhex =  colorstring.substring(9,12);
											
												var hue = parseInt(huehex, 16)/360;
												var sat = parseInt(sathex, 16)/1000;
												var dim = parseInt(dimhex, 16)/1000; 
											
												device.setCapabilityValue('light_hue', hue)
												.catch( err => {
												console.error(err);
												});
												
												device.setCapabilityValue('light_saturation', sat)
												.catch( err => {
												console.error(err);
												});
												
												device.setCapabilityValue('dim', dim)
												.catch( err => {
												console.error(err);
												});
											}});
												


	device.registerCapabilityListener('onoff', async ( value ) => {
	APIdevice.sendvalues(value, 'onoff');
	});
	
	device.registerCapabilityListener('dim', async ( value ) => {
	APIdevice.sendvalues(value, 'dim');
	});
	
	device.registerCapabilityListener('light_hue', async ( value ) => {
	APIdevice.sendvalues(value, 'hue');
	});
	
	device.registerCapabilityListener('light_saturation', async ( value ) => {
	APIdevice.sendvalues(value, 'light_saturation');
	});
	
	device.registerCapabilityListener('light_mode', async ( value ) => {
	APIdevice.sendvalues(value, 'colormode');
	});
	
//Disconnect after 10 seconds
setTimeout(() => { APIdevice.disconnect(); }, 50000);
 
};

module.exports = TuyaDevice;