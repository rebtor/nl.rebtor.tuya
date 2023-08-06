'use strict';

const Homey = require('homey');

class Tuyadriver extends Homey.App {

    onInit() {
        this.log('Tuyadriver is running...');

        // Migrate from old 'randomkey' setting
        const randomKey = this.homey.settings.get('randomkey');
        if (randomKey)
            this.homey.settings.set('randomDeviceId', randomKey)
    }
}

module.exports = Tuyadriver;
