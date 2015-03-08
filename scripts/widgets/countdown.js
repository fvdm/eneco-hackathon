define('widgets/countdown', ['utils/formatter'], function(format){
    'use strict';

    function Countdown(dom){
        this._countdown = document.createElement('span');
        this._countdown.className = 'countdown';
        this._countdown.innerText = '00:00:00';
        dom.appendChild(this._countdown);
        dom.className += ' countdown-container';
    }

    Countdown.prototype.start = function(until){
        var that = this;

        return new Promise(function(fulfill, reject){
            var interval = setInterval(update, 1000);

            function update(){
                var millis = until.getTime() - Date.now();
                if(millis < 0){
                    clearInterval(interval);
                    that._countdown.innerText = format.time(0);
                    fulfill();
                }else{
                    that._countdown.innerText = format.time(millis);
                }
            }
        });
    };

    return Countdown;
});