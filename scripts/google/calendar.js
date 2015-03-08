define('google/calendar', ['google/auth'], function(gAuth){
    'use strict';

    // Promise
    gapi.client.load('calendar', 'v3');

    return {

        /*
         * Returns the list of calendars
         * @returns {Promise} promise
         * @returns {function} promise.then
         * @returns {Array} promise.then.calendars
         */
        getCalendars: function(){
            return new Promise(function(fulfill, reject){
                gapi.client.calendar.calendarList.list().then(
                    function(response){
                        var result = JSON.parse(response.body);
                        fulfill(result.items);
                    },
                    reject);
            });
        },

        /*
         * Returns the next event of the first calendar
         * // TODO: find events in all calendars
         * @returns {Promise} promise
         * @returns {function} promise.then
         * @returns {Event || null} promise.then.nextEvent
         */
        getNextEvent: function(){
            var that = this;

            return new Promise(function(fulfill, reject){
                that.getCalendars().then(function(calendars){

                    var calendarId = calendars[0].id;
                    gapi.client.calendar.events
                        .list({
                            calendarId: calendarId,
                            timeMin: new Date().toISOString(),
                            orderBy: 'startTime',
                            singleEvents: true
                        })
                        .then(
                            function(response){
                                // TODO:
                                // that's very hacky because it
                                // should be server logic
                                // and work with acknoledgment over events
                                var result = JSON.parse(response.body),
                                    events = result.items,
                                    i = 0,
                                    event;

                                function hasAlreadyStarted(event){
                                    console.log('hasAlreadyStarted?', event, new Date(event.start.dateTime).getTime() <= Date.now());
                                    return new Date(event.start.dateTime).getTime() <= Date.now();
                                }

                                do{
                                    event = events[i++];
                                }while(event && hasAlreadyStarted(event));

                                fulfill(event || null);
                            },
                            reject);
                });

            });
        }
    };
});