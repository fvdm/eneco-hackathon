define('lamps', ['eneco/toon', 'devices/lamp'], function(toon, Lamp){
    'use strict';

    var lamps = [];

    toon.lamps.list().then(
        function(response){
            lamps = response;
        },
        function(){
            // Hacky: but as a back-up plan: default lamp if the call fails to get all lamps
            // this call got stuck once, so I don't trust it!!!!
            lamps.push(new Lamp('b2-haet-0483:happ_smartplug_644EAC423D7'));
        });

    return {
        turnOn: function(index){
            if(typeof index === 'number'){
                if(lamps[index]){
                    lamps[index].on();
                }
            }else{
                lamps.forEach(function(lamp){
                    lamp.on();
                });
            }
        },

        turnOff: function (index) {
            lamps.forEach(function(lamp){
                lamp.off();
            });
        }
    };
});