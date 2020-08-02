'use strict';

// constanten
const Homey = require('homey');
const Tuydriver = require('/modules/tuydriver/index.js');
const TuyAPI = require('/modules/tuyapi/index.js');

var device = {};

// start device
class TuyaDevice extends Homey.Device {

    onInit() {
        Tuydriver.devicelog('Device: ', 'NEO Coolcam 3600w has been inited');
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
        Tuydriver.devicelog('Data from device:', data);
        Tuydriver.processdata(device, data, 'onoff');
    });

    device.registerCapabilityListener('onoff', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'onoff');
    });

}

module.exports = TuyaDevice;
