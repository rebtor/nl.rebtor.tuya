const Homey = require('homey');

module.exports = class MyDriver extends Homey.Driver {

    onInit() {

        // Register triggers for flows
        this._triggerSwitchSoc1On = new Homey.FlowCardTriggerDevice('Soc1_true')
            .register();
        this._triggerSwitchSoc1Off = new Homey.FlowCardTriggerDevice('Soc1_off')
            .register();
        this._triggerSwitchSoc2On = new Homey.FlowCardTriggerDevice('Soc2_true')
            .register();
        this._triggerSwitchSoc2Off = new Homey.FlowCardTriggerDevice('Soc2_off')
            .register();
        this._triggerSwitchSoc3On = new Homey.FlowCardTriggerDevice('Soc3_true')
            .register();
        this._triggerSwitchSoc3Off = new Homey.FlowCardTriggerDevice('Soc3_off')
            .register();
        this._triggerSwitchSoc4On = new Homey.FlowCardTriggerDevice('Soc4_true')
            .register();
        this._triggerSwitchSoc4Off = new Homey.FlowCardTriggerDevice('Soc4_off')
            .register();
        this._triggerSwitchSocusbOn = new Homey.FlowCardTriggerDevice('Socusb_true')
            .register();
        this._triggerSwitchSocusbOff = new Homey.FlowCardTriggerDevice('Socusb_off')
            .register();

        // Register conditions for flows
        this._conditionSoc1on = new Homey.FlowCardCondition('Soc1_on')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.soc1'));
                return args.device.getCapabilityValue('onoff.soc1');
            });

        this._conditionSoc2on = new Homey.FlowCardCondition('Soc2_on')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.soc2'));
                return args.device.getCapabilityValue('onoff.soc2');
            });

        this._conditionSoc3on = new Homey.FlowCardCondition('Soc3_on')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.soc3'));
                return args.device.getCapabilityValue('onoff.soc3');
            });

        this._conditionSoc4on = new Homey.FlowCardCondition('Soc4_on')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.soc4'));
                return args.device.getCapabilityValue('onoff.soc4');
            });

        this._conditionSocusbon = new Homey.FlowCardCondition('Socusb_on')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.socusb'));
                return args.device.getCapabilityValue('onoff.socusb');
            });

        // Register actions for flows
        this._actionSoc1TurnOn = new Homey.FlowCardAction('Soc1_ton')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.soc1', true, {});
            });

        this._actionSoc1TurnOff = new Homey.FlowCardAction('Soc1_toff')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc1', false, {});
            });

        this._actionSoc1TurnOff = new Homey.FlowCardAction('Soc1_toggle')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.soc1') == true) {
                    return args.device.triggerCapabilityListener('onoff.soc1', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.soc1', true, {});
                }
            });

        this._actionSoc2TurnOn = new Homey.FlowCardAction('Soc2_ton')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.soc2', true, {});
            });

        this._actionSoc2TurnOff = new Homey.FlowCardAction('Soc2_toff')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc2', false, {});
            });

        this._actionSoc1TurnOff = new Homey.FlowCardAction('Soc2_toggle')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.soc2') == true) {
                    return args.device.triggerCapabilityListener('onoff.soc2', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.soc2', true, {});
                }
            });

        this._actionSoc3TurnOn = new Homey.FlowCardAction('Soc3_ton')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.soc3', true, {});
            });

        this._actionSoc3TurnOff = new Homey.FlowCardAction('Soc3_toff')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc3', false, {});
            });

        this._actionSoc1TurnOff = new Homey.FlowCardAction('Soc3_toggle')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.soc3') == true) {
                    return args.device.triggerCapabilityListener('onoff.soc3', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.soc3', true, {});
                }
            });

        this._actionSoc4TurnOn = new Homey.FlowCardAction('Soc4_ton')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.soc4', true, {});
            });

        this._actionSoc4TurnOff = new Homey.FlowCardAction('Soc4_toff')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc4', false, {});
            });

        this._actionSoc1TurnOff = new Homey.FlowCardAction('Soc4_toggle')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.soc4') == true) {
                    return args.device.triggerCapabilityListener('onoff.soc4', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.soc4', true, {});
                }
            });

        this._actionSocusbTurnOn = new Homey.FlowCardAction('Socusb_ton')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.socusb', true, {});
            });

        this._actionSocusbTurnOff = new Homey.FlowCardAction('Socusb_toff')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.socusb', false, {});
            });

        this._actionSoc4TurnOff = new Homey.FlowCardAction('Soc4_toff')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc4', false, {});
            });

        this._actionSoc1TurnOff = new Homey.FlowCardAction('Socusb_toggle')
            .register()
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.socusb') == true) {
                    return args.device.triggerCapabilityListener('onoff.socusb', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.socusb', true, {});
                }
            });
    }

    TriggerSoc1On(device, tokens, state) {
        this._triggerSwitchSoc1On
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSoc1Off(device, tokens, state) {
        this._triggerSwitchSoc1Off
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSoc2On(device, tokens, state) {
        this._triggerSwitchSoc2On
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSoc3On(device, tokens, state) {
        this._triggerSwitchSoc3On
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSoc4On(device, tokens, state) {
        this._triggerSwitchSoc4On
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSocusbOn(device, tokens, state) {
        this._triggerSwitchSocusbOn
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSoc2Off(device, tokens, state) {
        this._triggerSwitchSoc2Off
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSoc3Off(device, tokens, state) {
        this._triggerSwitchSoc3Off
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSoc4Off(device, tokens, state) {
        this._triggerSwitchSoc4Off
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

    TriggerSocusbOff(device, tokens, state) {
        this._triggerSwitchSocusbOff
        .trigger(device, tokens, state)
        .then(this.log)
        .catch(this.error)
    }

}
