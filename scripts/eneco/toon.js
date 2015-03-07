define('eneco/toon', [
    'eneco/config',
    'utils/parser'
    ], function(config, parser){
    'use strict';

    // TODO: use Promises
    function send(path, state, callback){
        var xhr = new XMLHttpRequest();
        xhr.onload = function(response){
            var result = JSON.parse(this.response);
            console.log('> ', path + ':', result);

            if(callback) callback(result);
        };
        xhr.open('POST', config.endpoint + path);
        xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
        // TODO: remove token from here
        xhr.setRequestHeader('Authorization', 'Bearer ' + config.authToken);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhr.setRequestHeader("Content-type", "application/json, text/javascript, */*; q=0.01");

        // TODO: remove data from here
        xhr.send(state);
    }

    return {

        auth: {
            // TODO: login
        },

        lamps: {

            list: function () {
                // body...
            },

            set: function(value, callback){
                // TODO: remove hardcoded ID from here
                send(
                    'smartplug/setTarget',
                    parser.toUrlEnc(
                        {
                            devUuid : 'b2-haet-0483:happ_smartplug_644EAC423D7',
                            state: value ? 1 : 0
                        }),
                    callback);
            }
        }

    };
});
