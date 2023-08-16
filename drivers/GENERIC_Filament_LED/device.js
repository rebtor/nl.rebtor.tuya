'use strict';

const Tuya = require('../../lib/tuya');
const Tuydriver = require('tuydriver');

class Device extends Tuya.Device {
    async onInit() {
        super.onInit();

        this.tuyapi.on('data', data => {
            Tuydriver.devicelog('Data from device:', data);
            Tuydriver.processdata(this, data, 'Filament');
        });

        this.registerCapabilityListener('onoff', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'onoff');
        });

        this.registerCapabilityListener('dim', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'dim2');
        });

        this.registerCapabilityListener('light_temperature', async(value) => {
            Tuydriver.sendvalues(this, this.tuyapi, value, 'light_temperature');
        });
    }
};

module.exports = Device;
