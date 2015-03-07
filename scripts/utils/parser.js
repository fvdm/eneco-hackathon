define('utils/parser', [], function(){
    'use strict';

    return {
        toUrlEnc: function (params){
            var result = [];
            for(var attr in params){
                result.push(attr, '=', params[attr], '&');
            }
            // remove '&' at the end
            result.pop();
            return result.join('');
        }
    };
});