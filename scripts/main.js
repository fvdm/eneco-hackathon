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

    attach(['#hotspot-2611563'],
        'click', lamps.turnOn);

    attach(['#hotspot-2612230'],
        'click', lamps.turnOff);

    attach(['#hotspot-2611336'],
        'click', lamps.startAnimation);

    attach(['#hotspot-2611337'],
        'click', lamps.stopAnimation);

    // Too hacky:
    setTimeout(function(){
        var target = document.getElementById('2590764').querySelector('.box-inner'),
            iframeHtml = '<iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=flickeracc15%40gmail.com&amp;color=%23FFFFFF&amp;ctz=Europe%2FAmsterdam" style=" border-width:0 " width="100%" height="600" frameborder="0" scrolling="no"></iframe>';

        target.firstElementChild.style.display = "none";
        target.innerHTML = iframeHtml + target.innerHTML;
    }, 1000)

});