define('lamps', ['eneco/toon'], function(toon){
    'use strict';

    function Lamp(id, state) {
        this.id = id;
        this.state = state || false;
    }

    Lamp.prototype.on = function(){
        this.state = true;
        toon.lamps.set(this.state);
    };

    Lamp.prototype.off = function(){
        this.state = false;
        toon.lamps.set(this.state);
    };

    var lamp = new Lamp('b2-haet-0483:happ_smartplug_644EAC423D7');

    return {
        turnOn: function(){
            lamp.on();
        },

        turnOff: function () {
            lamp.off();
        }
    };
});