'use strict';

const Tuya = require('../../lib/tuya');
const Tuydriver = require('tuydriver');

class Device extends Tuya.Device {
    async onInit() {
        super.onInit();

        this.tuyapi.on('data', data => {
            Tuydriver.devicelog('Data from device:', data, 'mulsoc');
            Tuydriver.processdata(this, data, 'mulsoc');
        });

        this.registerCapabilityListener('onoff', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'mulsoc');
        });

        this.registerCapabilityListener('onoff.soc1', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'mulsoc1');
        });

        this.registerCapabilityListener('onoff.soc2', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'mulsoc2');
        });

        this.registerCapabilityListener('onoff.soc3', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'mulsoc3');
        });

        this.registerCapabilityListener('onoff.soc4', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'mulsoc4');
        });

        this.registerCapabilityListener('onoff.socusb', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'mulsocusb');
        });
    }
};

module.exports = Device;
