'use strict';

//constanten
const Homey = require('homey');
const Tuydriver = require('tuydriver');
const TuyAPI = require('tuyapi');

var device = {};

// start device
class TuyaDevice extends Homey.Device {

    onInit() {
        Tuydriver.devicelog('Device: ', 'ANCCY Shutter Timer Switch has been inited');
        Tuydriver.devicelog('Device name: ', this.getName());
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
        Tuydriver.devicelog('Connected to device!');
        device.setAvailable();
    });

    APIdevice.on('disconnected', () => {
        Tuydriver.devicelog('Disconnected from device.');
        device.setUnavailable();
    });

    APIdevice.on('error', error => {
        Tuydriver.devicelog('Error: ', error);
        device.setUnavailable();
    });

    APIdevice.on('data', data => {
        Tuydriver.devicelog('Data from device:', data, 'windowcoverings_state');
        Tuydriver.processdata(device, data);
    });

    device.registerCapabilityListener('windowcoverings_state', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'windowcoverings_state');
    });

}

module.exports = TuyaDevice;
