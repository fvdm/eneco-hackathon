define('widgets/countdown', [], function(){


    function Countdown(dom){
        this._countdown = document.createElement('span');
        this._countdown.className = 'countdown';
        this._countdown.innerText = '00:00:00';
        dom.appendChild(this._countdown);
        dom.className += ' countdown-container';
    }

    return Countdown;
});