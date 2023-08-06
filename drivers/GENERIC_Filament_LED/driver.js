'use strict';
// Homey
const Homey = require("homey");
// Tuydriver ivm logging en ophalen van devices. 
const Tuydriver = require('tuydriver');

// Overige modules ivm tuyapi. 
const {TuyaContext} = require('@tuya/tuya-connector-nodejs');
const inquirer = require('inquirer');
const colors = require('colors');
const any = require('promise.any');
const AggregateError = require('es-aggregate-error/polyfill')();


class Socketdriver extends Homey.Driver {
  
  // functie voor toevoegen van devices.   
  async onPair(session) {
	
	// Zet variabelen klaar voor filtering op devicetype of model. 
	const Manifest = this.manifest;
	var DeviceTypeCode = '';
	var ModelTypeCode = '';
	var ProductIDCode = '';
	// Lees model en devicetype uit driver.compose.json
	
	for (const Settings of Manifest.settings) {
			for (const Instelling of Settings.children) {
				if (Instelling.id == 'DeviceTypeCode') {
				Tuydriver.devicelog('DeviceTypeCode =' + Instelling.value);
				DeviceTypeCode = Instelling.value; 
			}
			else if (Instelling.id == 'ModelTypeCode') {
				Tuydriver.devicelog('ModelTypeCode' + Instelling.value);
				 ModelTypeCode = Instelling.value; 
			}
			else if (Instelling.id == 'ProductIDCode') {
				Tuydriver.devicelog('ProductIDCode' + Instelling.value);
				 ProductIDCode = Instelling.value; 
			}
			};
		};
    
	// Haal keys uit instellingen
	const APIKey = this.homey.settings.get('apikey');
	const APISecret = this.homey.settings.get('apipassword');
	const APIRegion = this.homey.settings.get('region');
	const DeviceID = this.homey.settings.get('randomDeviceId');
	
	// Stel URL samen
	const url = 'https://openapi.tuya'+ APIRegion +'.com';
	 
	// Haal devices op van cloud. 
    session.setHandler("list_devices", async function () {
	  const devices = await Tuydriver.SearchDevices(DeviceTypeCode, ModelTypeCode, ProductIDCode, APIKey, APISecret, APIRegion, DeviceID);
      return devices;
    });
  }
}

module.exports = Socketdriver;