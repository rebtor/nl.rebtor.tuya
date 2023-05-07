'use strict';

//constanten
const Homey = require('homey');
const Tuydriver = require('tuydriver');
const TuyAPI = require('tuyapi');
var device = {};

// start device
class TuyaDevice extends Homey.Device {

    onInit() {
        Tuydriver.devicelog('Device: ', 'Smart Strip started');
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
        Tuydriver.devicelog('Data from device:', data, 'mulsoc');
        Tuydriver.processdata(device, data, 'mulsoc');
    });

    device.registerCapabilityListener('onoff', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'mulsoc');
    });

    device.registerCapabilityListener('onoff.soc1', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'mulsoc1');
    });

    device.registerCapabilityListener('onoff.soc2', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'mulsoc2');
    });

    device.registerCapabilityListener('onoff.soc3', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'mulsoc3');
    });

    device.registerCapabilityListener('onoff.soc4', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'mulsoc4');
    });

    device.registerCapabilityListener('onoff.socusb', async(value) => {
        Tuydriver.sendvalues(device, APIdevice, value, 'mulsocusb');
    });

}

module.exports = TuyaDevice;
