'use strict';

//constanten
const Homey = require('homey');
const Tuydriver = require('tuydriver');
const TuyAPI = require('tuyapi');

var device = {};

// start device
class TuyaDevice extends Homey.Device {
    onInit() {
        Tuydriver.devicelog('Device: ', 'LSC Smart Filament LED has been inited');
        Tuydriver.devicelog('Device name:', this.getName());
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
        Tuydriver.processdata(device, data, 'Filament');
    });

    device.registerCapabilityListener('onoff', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'onoff');
    });

    device.registerCapabilityListener('dim', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'dim2');
    });

    device.registerCapabilityListener('light_temperature', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'light_temperature');
    });

};

module.exports = TuyaDevice;
