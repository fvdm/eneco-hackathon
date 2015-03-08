define('utils/formatter', [], function(){
    return {

        /*
         * Formats in hh:mm:ss
         * @param {number} milliseconds
         * @returns {String} 'hh:mm:ss'
         */
        time: function (millis){
            var seconds = parseInt(millis/1000, 10),
                ss = seconds % 60,
                mm = parseInt(seconds % 3600 / 60, 10),
                hh = parseInt(seconds / 3600, 10);

                if(ss < 10) ss = '0'+ss;
                if(mm < 10) mm = '0'+mm;

            return [hh, ':', mm, ':', ss].join('');
        }
    };
});