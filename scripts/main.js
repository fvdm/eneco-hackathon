define('main', ['lamps'], function(lamps){
   'use strict';

   /*
    * Before you keep looking... be aware that this is a hackathon
    * so you may come across some really dirty stuff.
    * Disclaimer:
    * The following code may hurt your feelings ;P
    */

    function attach(selectors, eventType, callback){
        if(!(selectors instanceof Array)){
            selectors = [selectors];
        }
        selectors.forEach(
            function(selector){
                document.querySelector(selector)
                    .addEventListener(eventType, callback);
            });
    }

    attach(['#hotspot-2611336', '#hotspot-2611563'],
        'click', lamps.turnOn);

    attach(['#hotspot-2611337', '#hotspot-2612230'],
        'click', lamps.turnOff);

});