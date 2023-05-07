'use strict';
var logging = true;
const Homey = require('homey');

const {TuyaContext} = require('@tuya/tuya-connector-nodejs');
const inquirer = require('inquirer');
const colors = require('colors');
const any = require('promise.any');
const AggregateError = require('es-aggregate-error/polyfill')();


module.exports = {
SearchDevices: async function (Category, Model, Productid, APIKey, APISecret, APIRegion, DeviceID) {

const url = 'https://openapi.tuyaeu.com';

	// Get seed device
	let userId;
	let foundAPIRegion = APIRegion;

	try {
		const {device, region} = await any((APIRegion ? [APIRegion] : REGIONS).map(async region => {
			const api = new TuyaContext({
				baseUrl: url ,
				accessKey: APIKey,
				secretKey: APISecret
			});

			const result = await api.request({
				method: 'GET',
				path: `/v1.0/devices/${DeviceID}`
			});

			if (!result.success) {
				throw new Error(`${result.code}: ${result.msg}`);
			}

			return {device: result.result, region};
		}));

		userId = device.uid;
		foundAPIRegion = region;
	} catch (error) {
		if (process.env.DEBUG) {
			if (error.constructor === AggregateError) {
				console.error(error.errors);
			} else {
				console.error(error);
			}
		}

		console.error(colors.red('There was an issue fetching that device. Make sure your account is linked and the ID is correct.'));

		// eslint-disable-next-line unicorn/no-process-exit
		//process.exit(1);
	}

	// Get user devices
	const api = new TuyaContext({
				baseUrl: url ,
				accessKey: APIKey,
				secretKey: APISecret
			});

	const result = await api.request({
		method: 'GET',
		path: `/v1.0/users/${userId}/devices`
	});

	if (!result.success) {
		throw new Error(`${result.code}: ${result.msg}`);
	}
	//console.log(result.result);
	
	for (const device of result.result) {
		console.log(device);
		console.log(device.status);		
	}

	
	
	const groupedDevices = {};
	for (const device of result.result) {
		if ((device.category == Category || Category == '') && ((device.model == Model  || Model == '' || (Model == 'GPD' && device.status.length > 3) || (Model == 'GNPD' && device.status.length < 3)) || (device.product_id == Productid))) {
		if (device.node_id) {
			if (!groupedDevices[device.local_key] || !groupedDevices[device.local_key].subDevices) {
				groupedDevices[device.local_key] = {...groupedDevices[device.local_key], subDevices: []};
			}

			groupedDevices[device.local_key].subDevices.push(device);
		} else {
			groupedDevices[device.local_key] = {...device, ...groupedDevices[device.local_key]};
		}
		}
	
	}

	// Output devices
	const prettyDevices = Object.values(groupedDevices).map(device => {
		const pretty = {
			name: device.name,
			powerdevice: device.status.length > 3,
			data: { // this data object is saved to- and unique for the device. It is passed on the get and set functions as 1st argument
					IP: device.name + '-' + device.id // something unique, so your driver knows which physical device it is. A MAC address or Node IP, for example. This is required
				},
			settings: {
			ID: device.id,
			Key: device.local_key}
			//category: device.category,
			//product_name: device.product_name
		};

		if (device.subDevices) {
			const prettySubDevices = device.subDevices.map(subDevice => ({
				name: subDevice.name,
				ID: subDevice.id,
				cid: subDevice.node_id
			}));

			pretty.subDevices = prettySubDevices;
		}

		return pretty;
	});

    console.log(prettyDevices);

	return prettyDevices;

},

    // Decimal to Hex converter
    decimalToHex: function (d, padding) {
        var hex = Number(d).toString(16);
        padding = typeof(padding) === "undefined" || padding === null ? padding = 2 : padding;
        while (hex.length < padding) {
            hex = "0" + hex;
        }

        return hex;
    },

    // Logging
    devicelog: function (title, log) {
        if (logging == true) {
            console.log(title, log);
        }
    },

    // clearlog
    clearlog: function (device) {
        device.setSettings({
            DATAATLOG: '',
        })
        .catch(this.error)
    },

    // processdata

    processdata: function (device, data, type) { // check if data is valid
        this.devicelog('typeof: ', typeof data);
        if (typeof data == 'object') {
            // Form log entry
            if (device.getSetting('DATAATLOG').length < 1500) {
                var logvalue = (device.getSetting('DATAATLOG') + '\n NEW DATA ATRIBUTE: ' + JSON.stringify(data))
            } else {
                var logvalue = JSON.stringify(data)
            };
            // Write datalog to setting
            device.setSettings({
                DATAATLOG: logvalue,
            })
            .catch(this.error);

            // Shutter devices

            // verwerk shutter
            if (data.dps.hasOwnProperty('1') == true && type == 'windowcoverings_state') {

                if (data.dps['1'] == '1') {
                    var shutter = 'up';
                } else if (data.dps['1'] == '2') {
                    var shutter = 'down';
                } else {
                    var shutter = 'idle';
                }
                device.setCapabilityValue('windowcoverings_state', shutter)
                .catch(err => {
                    console.error(err);
                });
            }
            // verwerk shutter 2
            if (data.dps.hasOwnProperty('1') == true && type == 'windowcoverings_state2') {

                if (data.dps['1'] == 'on') {
                    var shutter = 'up';
                } else if (data.dps['1'] == 'off') {
                    var shutter = 'down';
                } else {
                    var shutter = 'idle';
                }
                device.setCapabilityValue('windowcoverings_state', shutter)
                .catch(err => {
                    console.error(err);
                });
            }	
            // onoff devices

            // verwerk onoff
            if (data.dps.hasOwnProperty('1') == true && type == 'onoff') {
                device.setCapabilityValue('onoff', data.dps['1'])
                .catch(err => {
                    console.error(err);
                });
            }

            // verwerk parameter 18 current
            if (data.dps.hasOwnProperty('18') == true && type == 'onoff') {
                device.setCapabilityValue('measure_current', data.dps['18'] / 1000)
                .catch(err => {
                    console.error(err);
                });
            }

            // verwerk parameter 19 measure power
            if (data.dps.hasOwnProperty('19') == true && type == 'onoff') {
                device.setCapabilityValue('measure_power', data.dps['19'] / 10)
                .catch(err => {
                    console.error(err);
                });
            }

            // verwerk parameter 20 voltage
            if (data.dps.hasOwnProperty('20') == true && type == 'onoff') {
                device.setCapabilityValue('measure_voltage', data.dps['20'] / 10)
                .catch(err => {
                    console.error(err);
                });
            }

            // multisocket devices 4 + USB


            // verwerk socket main
            if (type == 'mulsoc') {
                var soc1 = device.getCapabilityValue('onoff.soc1');
                var soc2 = device.getCapabilityValue('onoff.soc2');
                var soc3 = device.getCapabilityValue('onoff.soc3');
				var soc4 = device.getCapabilityValue('onoff.soc4');
                var socusb = device.getCapabilityValue('onoff.socusb');
				
				this.devicelog('SwitchSocket 1: ',soc1);
				this.devicelog('SwitchSocket 2: ',soc2);
				this.devicelog('SwitchSocket 3: ',soc3);
				this.devicelog('SwitchSocket 4: ',soc4);
				this.devicelog('SwitchSocket usb: ',socusb);				
				
                // verwerk socket 1
                if (data.dps.hasOwnProperty('1') == true && type == 'mulsoc') {
                    var soc1 = data.dps['1'];
                    this.devicelog('SwitchSocket 1: ',soc1);
					device.setCapabilityValue('onoff.soc1', data.dps['1'])
                    .catch(err => {
                        console.error(err);
                    });
                }

                // verwerk socket 2
                if (data.dps.hasOwnProperty('2') == true && type == 'mulsoc') {
                    var soc2 = data.dps['2'];
                    this.devicelog('SwitchSocket 2: ',soc2);
					device.setCapabilityValue('onoff.soc2', data.dps['2'])
                    .catch(err => {
                        console.error(err);
                    });
                }

				// verwerk socket 3
                if (data.dps.hasOwnProperty('3') == true && type == 'mulsoc') {
                    var soc3 = data.dps['3'];
                    this.devicelog('SwitchSocket 3: ',soc3);
                    device.setCapabilityValue('onoff.soc3', data.dps['3'])
                    .catch(err => {
                        console.error(err);
                    });
                }
				
				// 		verwerk socket 4
		 		if (data.dps.hasOwnProperty('4') == true && type == 'mulsoc') {
					var soc4 = data.dps['4'];
					this.devicelog('SwitchSocket 4: ',soc4);
					device.setCapabilityValue('onoff.soc4', data.dps['4'])
					.catch(err => {
						console.error(err);
                    });
                }

                // verwerk socket usb
                if (data.dps.hasOwnProperty('7') == true && type == 'mulsoc') {
                    var socusb = data.dps['7'];
                    this.devicelog('Switch USB: ',socusb);
					device.setCapabilityValue('onoff.socusb', data.dps['7'])
                    .catch(err => {
                        console.error(err);
                    });
                }

                if (soc1 == false && soc2 == false && soc3 == false && soc4 == false && socusb == false) {
                    var total_value = false;
                } else {
                    var total_value = true;
                }
				this.devicelog('Switch all multisock: ',total_value);
                device.setCapabilityValue('onoff', total_value)
                .catch(err => {
                    console.error(err);
                });
            }

            // multisocket devices 3 + USB

            // verwerk socket main
            if (type == 'mulsoc3') {
                var soc1 = device.getCapabilityValue('onoff.soc1');
                var soc2 = device.getCapabilityValue('onoff.soc2');
                var soc3 = device.getCapabilityValue('onoff.soc3');
                var socusb = device.getCapabilityValue('onoff.socusb');
				
				this.devicelog('SwitchSocket 1: ',soc1);
				this.devicelog('SwitchSocket 2: ',soc2);
				this.devicelog('SwitchSocket 3: ',soc3);
				this.devicelog('SwitchSocket usb: ',socusb);				
				
                // verwerk socket 1
                if (data.dps.hasOwnProperty('1') == true && type == 'mulsoc3') {
                    var soc1 = data.dps['1'];
                    this.devicelog('SwitchSocket 1: ',soc1);
					device.setCapabilityValue('onoff.soc1', data.dps['1'])
                    .catch(err => {
                        console.error(err);
                    });
                }

                // verwerk socket 2
                if (data.dps.hasOwnProperty('2') == true && type == 'mulsoc3') {
                    var soc2 = data.dps['2'];
                    this.devicelog('SwitchSocket 2: ',soc2);
					device.setCapabilityValue('onoff.soc2', data.dps['2'])
                    .catch(err => {
                        console.error(err);
                    });
                }

				//	verwerk socket 3
                if (data.dps.hasOwnProperty('3') == true && type == 'mulsoc3') {
                    var soc3 = data.dps['3'];
                    this.devicelog('SwitchSocket 3: ',soc3);
                    device.setCapabilityValue('onoff.soc3', data.dps['3'])
                    .catch(err => {
                        console.error(err);
                    });
                }

                // verwerk socket usb
                if (data.dps.hasOwnProperty('7') == true && type == 'mulsoc3') {
                    var socusb = data.dps['7'];
                    this.devicelog('Switch USB: ',socusb);
					device.setCapabilityValue('onoff.socusb', data.dps['7'])
                    .catch(err => {
                        console.error(err);
                    });
                }

                if (soc1 == false && soc2 == false && soc3 == false && socusb == false) {
                    var total_value = false;
                } else {
                    var total_value = true;
                }
				this.devicelog('Switch all multisock: ',total_value);
                device.setCapabilityValue('onoff', total_value)
                .catch(err => {
                    console.error(err);
                });
            }


            // Filament devices

            // verwerk onoff
            if (data.dps.hasOwnProperty('1') == true && type == 'Filament') {
                device.setCapabilityValue('onoff', data.dps['1'])
                .catch(err => {
                    console.error(err);
                });
            }

            // verwerk dim
            if (data.dps.hasOwnProperty('2') == true && type == 'Filament') {
                device.setCapabilityValue('dim', data.dps['2'] / 255)
                .catch(err => {
                    console.error(err);
                });
            }

            // verwerk temperature
            if (data.dps.hasOwnProperty('3') == true && type == 'Filament') {
                device.setCapabilityValue('light_temperature', 1 - (data.dps['3'] / 255))
                .catch(err => {
                    console.error(err);
                });
            }

            // RGB devices

            // verwerk onoff
            if (data.dps.hasOwnProperty('20') == true && type == 'RGB') {
                device.setCapabilityValue('onoff', data.dps['20'])
                .catch(err => {
                    console.error(err);
                });
            }

            // verwerk dim
            if (data.dps.hasOwnProperty('22') == true && type == 'RGB') {
                device.setCapabilityValue('dim', data.dps['22'] / 1000)
                .catch(err => {
                    console.error(err);
                });
            }

            // verwerk lightmode
            if (data.dps.hasOwnProperty('21') == true && type == 'RGB') {
                if (data.dps['21'] == 'colour') {
                    this.devicelog('colormode:', 'color');
                    var mode = 'color';
                } else {
                    this.devicelog('colormode:', 'temperature');
                    var mode = 'temperature';
                }
                device.setCapabilityValue('light_mode', mode)
                .catch(err => {
                    console.error(err);
                });
            }

            // verwerk parameter 24 kleur
            if (data.dps.hasOwnProperty('24') == true && type == 'RGB') {
                var colorstring = data.dps['24'];

                var huehex = colorstring.substring(1, 4);
                var sathex = colorstring.substring(5, 8);
                var dimhex = colorstring.substring(9, 12);

                var hue = parseInt(huehex, 16) / 360;
                var sat = parseInt(sathex, 16) / 1000;
                var dim = parseInt(dimhex, 16) / 1000;

                device.setCapabilityValue('light_hue', hue)
                .catch(err => {
                    console.error(err);
                });

                device.setCapabilityValue('light_saturation', sat)
                .catch(err => {
                    console.error(err);
                });

                device.setCapabilityValue('dim', dim)
                .catch(err => {
                    console.error(err);
                });
            }
        }
    },

    // Reconnect
    reconnect: function (APIdevice, device) {
        setTimeout(() => {
            var state = device.getAvailable();
            this.devicelog('Status: ', state);
			
            if (state == false) {
				device.setUnavailable();
                //Find device on network
                APIdevice.find().then(() => {
                    // Connect to device
                    APIdevice.connect().catch(err => {
                        console.error(err);
                    });
                })
                .catch(err => {
                    console.error(err);
                });
            }
            this.reconnect(APIdevice, device);
        }, 20000);
    },

    // Send values function
    sendvalues: function (device, APIdevice, value, parameter) {

        var onoff = device.getCapabilityValue('onoff');
        var dim = Math.round(device.getCapabilityValue('dim') * 1000);
        var light_hue = Math.round(device.getCapabilityValue('light_hue') * 360);
        var light_saturation = Math.round(device.getCapabilityValue('light_saturation') * 1000);
        var light_mode = device.getCapabilityValue('light_mode');

        var dimhex = this.decimalToHex(dim, 3);
        var huehex = this.decimalToHex(light_hue, 3);
        var sathex = this.decimalToHex(light_saturation, 3);

        var colorcode = ('0' + huehex + '0' + sathex + '0' + dimhex);

        if (parameter == 'onoff') {
            return APIdevice.set({
                set: value
            })
            .catch(err => {
                console.error(err);
            });
		} else if (parameter == 'onoff.strip') {
            return APIdevice.set({
                dps: 20,
				set: value
            })
		.catch(err => {
			console.error(err);
		});
       } else if (parameter == 'light_temperature') {
            var tempvalue = Math.round(255 - (value * 255));
            this.devicelog('Device: temp to ', tempvalue);
            return APIdevice.set({
                dps: 3,
                set: tempvalue
            })
            .catch(err => {
                console.error(err);
            });
        } else if (parameter == 'windowcoverings_state') {
            this.devicelog('Device: shutter value ', value);
			if (value == 'up') {
                var shuttervalue = '1';
            } else if (value == 'down') {
                var shuttervalue = '2';
            } else {
                var shuttervalue = '3';
            }
            this.devicelog('Device: shutterstate ', shuttervalue);
            return APIdevice.set({
                dps: 1,
                set: shuttervalue
            })
            .catch(err => {
                console.error(err);
            });
        } else if (parameter == 'windowcoverings_state2') {
            this.devicelog('Device: shutter value ', value);
			if (value == 'up') {
                var shuttervalue = 'on';
            } else if (value == 'down') {
                var shuttervalue = 'off';
            } else {
                var shuttervalue = 'stop';
            }
            this.devicelog('Device: shutterstate ', shuttervalue);
            return APIdevice.set({
                dps: 1,
                set: shuttervalue
            })
            .catch(err => {
                console.error(err);
            });
        } else if (parameter == 'dim2') {
            var dimvalue = Math.round(value * 255);
            this.devicelog('Device: dim to ', dimvalue);
            return APIdevice.set({
                dps: 2,
                set: dimvalue
            })
            .catch(err => {
                console.error(err);
            });
        } else if (parameter == 'dim' && light_mode == 'temperature') {
            this.devicelog('Device: ', 'zet wit dimmer');
            var dimvalue = value * 1000;
            this.devicelog('Device: ', 'dim to value');
            return APIdevice.set({
                dps: 22,
                set: dimvalue
            })
            .catch(err => {
                console.error(err);
            });
        } else if (parameter == 'dim' && light_mode == 'color') {
            var setvalue = Math.round(value * 1000);
            var dimhex = this.decimalToHex(setvalue, 3);
            var colorcode = ('0' + huehex + '0' + sathex + '0' + dimhex);
            this.devicelog('colorcode set: ', colorcode);
            return APIdevice.set({
                multiple: true,
                data: {
                    21: 'colour',
                    24: colorcode,
                    25: colorcode
                }
            })
            .catch(err => {
                console.error(err);
            });
        } else if (parameter == 'hue') {
            var setvalue = Math.round(value * 360);
            var huehex = this.decimalToHex(setvalue, 3);
            var colorcode = ('0' + huehex + '0' + sathex + '0' + dimhex);
            this.devicelog('colorcode set: ', colorcode);
            return APIdevice.set({
                multiple: true,
                data: {
                    21: 'colour',
                    24: colorcode,
                    25: colorcode
                }
            })
            .catch(err => {
                console.error(err);
            });
        } else if (parameter == 'light_saturation') {
            var setvalue = Math.round(value * 1000);
            var sathex = this.decimalToHex(setvalue, 3);
            var colorcode = ('0' + huehex + '0' + sathex + '0' + dimhex);
            this.devicelog('colorcode set: ', colorcode);
            return APIdevice.set({
                multiple: true,
                data: {
                    21: 'colour',
                    24: colorcode,
                    25: colorcode
                }
            })
            .catch(err => {
                console.error(err);
            });
        } else if (parameter == 'colormode') {
            if (value == 'temperature') {
                return APIdevice.set({
                    dps: 21,
                    set: 'white'
                })
                .catch(err => {
                    console.error(err);
                });
            } else {
                return APIdevice.set({
                    multiple: true,
                    data: {
                        21: 'colour',
                        24: 'colorcode',
                        25: 'colorcode'
                    }
                }).catch(err => {
                    console.error(err);
                });
            }
        } else if (parameter == 'mulsoc') {
            return APIdevice.set({
                multiple: true,
                data: {
                    1: value,
                    2: value,
                    3: value,
                    4: value,
                    7: value
                }
            }).catch(err => {
                console.error(err);
            });
        } else if (parameter == 'mulsoc1') {
            let currentValueSoc1 = device.getCapabilityValue('onoff.Soc1');
            return APIdevice.set({
                dps: 1,
                set: value
            })
            .catch(err => {
                console.error(err);
            });

		if (value == true) {

			this._driver = device.driver;
			this._driver.TriggerSoc1On(device, {}, {});
		} else {
			this._driver = device.driver;
			this._driver.TriggerSoc1Off(device, {}, {});
		}

        } else if (parameter == 'mulsoc2') {
            let currentValueSoc2 = device.getCapabilityValue('onoff.Soc2');

            return APIdevice.set({
                dps: 2,
                set: value
            })
            .catch(err => {
                console.error(err);
            });

        } else if (parameter == 'mulsoc3') {
            let currentValueSoc3 = device.getCapabilityValue('onoff.Soc3');

            return APIdevice.set({
                dps: 3,
                set: value
            })
            .catch(err => {
                console.error(err);
            });

        } else if (parameter == 'mulsoc4') {
            let currentValueSoc4 = device.getCapabilityValue('onoff.Soc4');

            return APIdevice.set({
                dps: 4,
                set: value
            })
            .catch(err => {
                console.error(err);
            });

        } else if (parameter == 'mulsocusb') {
            let currentValueSocusb = device.getCapabilityValue('onoff.Socusb');

            return APIdevice.set({
                dps: 7,
                set: value
            })
            .catch(err => {
                console.error(err);
            });

        }
    }
};
