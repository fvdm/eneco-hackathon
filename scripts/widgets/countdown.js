define('widgets/countdown', [], function(){
    'use strict';

    function Countdown(dom){
        this._countdown = document.createElement('span');
        this._countdown.className = 'countdown';
        this._countdown.innerText = '00:00:00';
        dom.appendChild(this._countdown);
        dom.className += ' countdown-container';
    }

    // TODO: move to utils
    function format(millis){
        var seconds = parseInt(millis/1000, 10),
            ss = seconds % 60,
            mm = parseInt(seconds % 3600 / 60, 10),
            hh = parseInt(seconds / 3600, 10);

            if(ss < 10) ss = '0'+ss;
            if(mm < 10) mm = '0'+mm;

        return [hh, ':', mm, ':', ss].join('');
    }

    Countdown.prototype.start = function(until){
        var that = this;

        return new Promise(function(fulfill, reject){
            var interval = setInterval(update, 1000);

            function update(){
                var millis = until.getTime() - Date.now();
                if(millis < 0){
                    clearInterval(interval);
                    that._countdown.innerText = format(0);
                    fulfill();
                }else{
                    that._countdown.innerText = format(millis);
                }
            }
        });
    };

    return Countdown;
});