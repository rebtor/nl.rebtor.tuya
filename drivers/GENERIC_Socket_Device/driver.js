'use strict';

const Tuya = require('../../lib/tuya');

class Driver extends Tuya.Driver {
	async onPair(session) {
	 	super.onPair(session, 'GNPD')
	}
};

module.exports = Driver;
