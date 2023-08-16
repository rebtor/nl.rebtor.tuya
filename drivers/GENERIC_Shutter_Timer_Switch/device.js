'use strict';

const Tuya = require('../../lib/tuya');
const Tuydriver = require('tuydriver');

class Device extends Tuya.Device {
    async onInit() {
        super.onInit();

        this.tuyapi.on('data', data => {
            if (this.getSetting('mode') == 'onoff') {
                Tuydriver.devicelog('Data from device:', data, 'windowcoverings_state2');}
            else {
                Tuydriver.devicelog('Data from device:', data, 'windowcoverings_state');
            }
            Tuydriver.processdata(this, data);
        });

        this.registerCapabilityListener('windowcoverings_state', async(value) => {
            if (this.getSetting('mode') == 'onoff') {
                Tuydriver.sendvalues(this, this.tuyapi, value, 'windowcoverings_state2');}
            else {
                Tuydriver.sendvalues(this, this.tuyapi, value, 'windowcoverings_state');
            }
        });
    }
};

module.exports = Device;
