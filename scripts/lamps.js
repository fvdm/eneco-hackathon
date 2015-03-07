define('lamps', ['eneco/toon', 'devices/lamp'], function(toon, Lamp){
    'use strict';

    var lamps = [];


    toon.lamps.list().then(
        function(response){
            debugger;
            lamps = response;

            console.log('list: ', arguments);
        },
        function(){
            debugger;
            // Hacky: default lamp if fails to get all of them
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