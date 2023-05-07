'use strict';

//constanten
const Homey = require('homey');
const Tuydriver = require('tuydriver');
const TuyAPI = require('tuyapi');

var device = {};

// start device
class TuyaDevice extends Homey.Device {
    onInit() {
        const Driveromschrijving = this.driver.manifest.name.en;
        Tuydriver.devicelog('Device name: ', Driveromschrijving + ': '+ this.getName()+ ' has been inited');
        Tuydriver.clearlog(this);
        Tuyadevicedata(this)
    }
};

function Tuyadevicedata(device_data) {
    var device = device_data;
    var APIdevice = new TuyAPI({
            id: device.getSetting('ID'),
            key: device.getSetting('Key'),
            ip: device.getSetting('IP'),
			version: device.getSetting('Version')
        });

    device.setUnavailable();
    Tuydriver.reconnect(APIdevice, device);

    // Add event listeners
    APIdevice.on('connected', () => {
        Tuydriver.devicelog('Device', 'Connected to device!');
        device.setAvailable();
    });

    APIdevice.on('disconnected', () => {
        Tuydriver.devicelog('Device', 'Disconnected from device.');
        device.setUnavailable();
    });

    APIdevice.on('error', error => {
        Tuydriver.devicelog('Error: ', error);
        device.setUnavailable();
    });

    APIdevice.on('data', data => {
        Tuydriver.devicelog('Data from device:', data);
        Tuydriver.processdata(device, data, 'RGB');
    });

    device.registerCapabilityListener('onoff', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'onoff.strip');
    });

    device.registerCapabilityListener('dim', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'dim');
    });

    device.registerCapabilityListener('light_hue', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'hue');
    });

    device.registerCapabilityListener('light_saturation', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'light_saturation');
    });

    device.registerCapabilityListener('light_mode', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'colormode');
    });

};

module.exports = TuyaDevice;
