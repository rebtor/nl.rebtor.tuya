const Homey = require('homey');

module.exports = class MyDriver extends Homey.Driver {

    async onInit() {

        // Register triggers for flows
        this._triggerSwitchSoc1On 	 = this.homey.flow.getDeviceTriggerCard('Soc1_true');
        this._triggerSwitchSoc1Off 	 = this.homey.flow.getDeviceTriggerCard('Soc1_off'); 
        this._triggerSwitchSoc2On 	 = this.homey.flow.getDeviceTriggerCard('Soc2_true'); 
        this._triggerSwitchSoc2Off 	 = this.homey.flow.getDeviceTriggerCard('Soc2_off');
        this._triggerSwitchSoc3On 	 = this.homey.flow.getDeviceTriggerCard('Soc3_true');
        this._triggerSwitchSoc3Off 	 = this.homey.flow.getDeviceTriggerCard('Soc3_off');
        this._triggerSwitchSoc4On 	 = this.homey.flow.getDeviceTriggerCard('Soc4_true');
        this._triggerSwitchSoc4Off 	 = this.homey.flow.getDeviceTriggerCard('Soc4_off');
        this._triggerSwitchSocusbOn  = this.homey.flow.getDeviceTriggerCard('Socusb_true');
        this._triggerSwitchSocusbOff = this.homey.flow.getDeviceTriggerCard('Socusb_off');


        // Register conditions for flows
        this._conditionSoc1on = this.homey.flow.getConditionCard('Soc1_on');

            this._conditionSoc1on.registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.soc1'));
                return args.device.getCapabilityValue('onoff.soc1');
            });

        this._conditionSoc2on = this.homey.flow.getConditionCard('Soc2_on');

            this._conditionSoc2on.registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.soc2'));
                return args.device.getCapabilityValue('onoff.soc2');
            });

        this._conditionSoc3on = this.homey.flow.getConditionCard('Soc3_on');

            this._conditionSoc3on.registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.soc3'));
                return args.device.getCapabilityValue('onoff.soc3');
            });

        this._conditionSoc4on = this.homey.flow.getConditionCard('Soc4_on');

            this._conditionSoc4on.registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.soc4'));
                return args.device.getCapabilityValue('onoff.soc4');
            });

        this._conditionSocusbon = this.homey.flow.getConditionCard('Socusb_on');

            this._conditionSoc4on.registerRunListener((args, state) => {
                this.log('FlowCardCondition evalutated for', args.device.getName(), ', device state: ', args.device.getCapabilityValue('onoff.socusb'));
                return args.device.getCapabilityValue('onoff.socusb');
            });

        // Register actions for flows
        this._actionSoc1TurnOn = this.homey.flow.getActionCard('Soc1_ton')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.soc1', true, {});
            });

        this._actionSoc1TurnOff = this.homey.flow.getActionCard('Soc1_toff')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc1', false, {});
            });

        this._actionSoc1TurnOff = this.homey.flow.getActionCard('Soc1_toggle')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.soc1') == true) {
                    return args.device.triggerCapabilityListener('onoff.soc1', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.soc1', true, {});
                }
            });

        this._actionSoc2TurnOn = this.homey.flow.getActionCard('Soc2_ton')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.soc2', true, {});
            });

        this._actionSoc2TurnOff = this.homey.flow.getActionCard('Soc2_toff')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc2', false, {});
            });

        this._actionSoc1TurnOff = this.homey.flow.getActionCard('Soc2_toggle')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.soc2') == true) {
                    return args.device.triggerCapabilityListener('onoff.soc2', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.soc2', true, {});
                }
            });

        this._actionSoc3TurnOn = this.homey.flow.getActionCard('Soc3_ton')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.soc3', true, {});
            });

        this._actionSoc3TurnOff = this.homey.flow.getActionCard('Soc3_toff')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc3', false, {});
            });

        this._actionSoc1TurnOff = this.homey.flow.getActionCard('Soc3_toggle')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.soc3') == true) {
                    return args.device.triggerCapabilityListener('onoff.soc3', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.soc3', true, {});
                }
            });

        this._actionSoc4TurnOn = this.homey.flow.getActionCard('Soc4_ton')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.soc4', true, {});
            });

        this._actionSoc4TurnOff = this.homey.flow.getActionCard('Soc4_toff')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc4', false, {});
            });

        this._actionSoc1TurnOff = this.homey.flow.getActionCard('Soc4_toggle')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');

                if (args.device.getCapabilityValue('onoff.soc4') == true) {
                    return args.device.triggerCapabilityListener('onoff.soc4', false, {});
                } else {
                    return args.device.triggerCapabilityListener('onoff.soc4', true, {});
                }
            });

        this._actionSocusbTurnOn = this.homey.flow.getActionCard('Socusb_ton')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch on');
                return args.device.triggerCapabilityListener('onoff.socusb', true, {});
            });

        this._actionSocusbTurnOff = this.homey.flow.getActionCard('Socusb_toff')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.socusb', false, {});
            });

        this._actionSoc4TurnOff = this.homey.flow.getActionCard('Soc4_toff')
            .registerRunListener((args, state) => {
                this.log('FlowCardAction triggered for ', args.device.getName(), 'to switch off');
                return args.device.triggerCapabilityListener('onoff.soc4', false, {});
            });

        this._actionSoc1TurnOff = this.homey.flow.getActionCard('Socusb_toggle')
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
