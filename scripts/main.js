define('main',
    ['lamps', 'widgets/countdown', 'google/auth', 'google/calendar'],
    function(lamps, Countdown, gAuth, gCal){
    'use strict';

   /*
    * Before you keep looking... be aware that this is a hackathon
    * so you may come across some really dirty stuff.
    * Disclaimer:
    * The following code may hurt your feelings ;P
    */

    function attach(callback, selectors, eventType){
        eventType = eventType || 'click';

        if(!(selectors instanceof Array)){
            selectors = [selectors];
        }
        selectors.forEach(
            function(selector){
                document.querySelector(selector)
                    .addEventListener(eventType, callback);
            });
    }

    /*
     * Hocking up the design
     */
    attach(lamps.turnOn, ['#hotspot-2611563']);
    attach(lamps.turnOff, ['#hotspot-2612230']);
    attach(lamps.startAnimation, ['#hotspot-2611336']);
    attach(lamps.stopAnimation, ['#hotspot-2611337', '#hotspot-2614947']);

    /*
     * Google API
     */
    gAuth.isAuthenticated()
        .then(
            function(){
                // hide google loggin button?
            },
            function(){
                gAuth.login().then(
                    function(){

                    });
            });

    /*
     * Countdown
     */
    var countdown = new Countdown(document.getElementById('hotspot-2613307'));

    // Very Hacky... very late :P
    // HACK Wait for google API
    setTimeout(
        function setCountdownToNextEvent(){
            gCal.getNextEvent()
                .then(function(nextEvent){
                    if(nextEvent){
                        var date = new Date(nextEvent.start.dateTime);

                        // TODO: remove the time to get there
                        // date.setTime(date.getTime() - (60000 + 30000));
                        countdown.start(date)
                            .then(
                                function(){
                                    lamps.startAnimation();
                                    // Redirect to dismiss-alert screen
                                    window.location.href = window.location.href.replace(/#\d*$/, '#2592674');
                                    setCountdownToNextEvent();
                                });
                    }
                });
        }, 2000);

    /*
     * Calendar iframe
     */
    // Too hacky:
    setTimeout(function(){
        gCal.getCalendars().then(function(calendars){
            // Show events for the first calendar
            // TODO: avoid iframe, create content
            var calendarId = calendars[0].id;
            var target = document.getElementById('2590764').querySelector('.box-inner'),
                iframeHtml = '<iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=' + calendarId + '&amp;color=%23FFFFFF&amp;ctz=Europe%2FAmsterdam" style=" border-width:0 " width="100%" height="600" frameborder="0" scrolling="no"></iframe>';

            target.firstElementChild.style.display = "none";
            target.innerHTML = iframeHtml + target.innerHTML;
        });
    }, 1000);

});