'use strict';

const Tuya = require('../../lib/tuya');
const Tuydriver = require('tuydriver');

class Device extends Tuya.Device {
    async onInit() {
        super.onInit();

        this.tuyapi.on('data', data => {
            Tuydriver.devicelog('Data from device:', data);
            Tuydriver.processdata(this, data, 'RGB');
        });

        this.registerCapabilityListener('onoff', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'onoff.strip');
        });

        this.registerCapabilityListener('dim', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'dim');
        });

        this.registerCapabilityListener('light_hue', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'hue');
        });

        this.registerCapabilityListener('light_saturation', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'light_saturation');
        });

        this.registerCapabilityListener('light_mode', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'colormode');
        });
    }
};

module.exports = Device;
