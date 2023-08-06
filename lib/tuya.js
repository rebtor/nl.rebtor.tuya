'use strict';

const Homey = require('homey');
const TuyAPI = require('tuyapi');
const Tuydriver = require('tuydriver');

class Driver extends Homey.Driver {
    async onPair(session, ModelTypeCode = '') {
        const Manifest = this.manifest;
        var DeviceTypeCode = '';
        var ProductIDCode = '';

        for (const Settings of Manifest.settings) {
            for (const Instelling of Settings.children) {
                if (Instelling.id == 'DeviceTypeCode') {
                    Tuydriver.devicelog('DeviceTypeCode =' + Instelling.value);
                    DeviceTypeCode = Instelling.value;
                } else if (Instelling.id == 'ModelTypeCode') {
                    Tuydriver.devicelog('ModelTypeCode' + Instelling.value);
                    ModelTypeCode = Instelling.value;
                } else if (Instelling.id == 'ProductIDCode') {
                    Tuydriver.devicelog('ProductIDCode' + Instelling.value);
                    ProductIDCode = Instelling.value;
                }
            };
        };

        const APIKey = this.homey.settings.get('apikey');
        const APISecret = this.homey.settings.get('apipassword');
        const APIRegion = this.homey.settings.get('region');
        const DeviceID = this.homey.settings.get('randomDeviceId');

        const url = 'https://openapi.tuya'+ APIRegion +'.com';

        session.setHandler("list_devices", async function () {
            const devices = await Tuydriver.SearchDevices(
                DeviceTypeCode, ModelTypeCode, ProductIDCode,
                APIKey, APISecret, APIRegion, DeviceID);
          return devices;
        });
    }
}

class Device extends Homey.Device {
    async onInit() {
        const driverName = this.driver.manifest.name.en;
        Tuydriver.devicelog('Device name: ', driverName + ': '+ this.getName()+ ' has been inited');
        Tuydriver.clearlog(this);

        this.tuyapi = new TuyAPI({
            id: this.getSetting('ID'),
            key: this.getSetting('Key'),
            ip: this.getSetting('IP'),
            version: this.getSetting('Version')
        });

        this.setUnavailable();
        Tuydriver.reconnect(this.tuyapi, this);

        this.tuyapi.on('connected', () => {
            Tuydriver.devicelog('Device', 'Connected to device!');
            this.setAvailable();
        });

        this.tuyapi.on('disconnected', () => {
            Tuydriver.devicelog('Device', 'Disconnected from device.');
            this.setUnavailable();
        });

        this.tuyapi.on('error', error => {
            Tuydriver.devicelog('Error: ', error);
            this.setUnavailable();
        });
    }
};

module.exports = { Driver, Device };
