define('eneco/toon', [
    'eneco/config',
    'utils/parser',
    'devices/lamp'
    ], function(config, parser, Lamp){
    'use strict';

    function send(params){
        return new Promise(function(fulfill, reject){
            params.method = params.method || 'GET';
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                var response = JSON.parse(this.response);
                console.log('> ', params.path + ':', response);

                if(response.success){
                    fulfill(response);
                }else{
                    reject(response);
                }
            };
            xhr.onerror = reject;
            xhr.open(params.method, config.endpoint + params.path);
            xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
            // TODO: remove token from here
            xhr.setRequestHeader('Authorization', 'Bearer ' + config.authToken);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // xhr.setRequestHeader("Content-type", "application/json, text/javascript, */*; q=0.01");

            // TODO: remove data from here
            xhr.send(params.data);
        });
    }

    return {

        auth: {
            // TODO: login
        },

        lamps: {

            list: function () {
                return send({
                    path: 'hue/getDeviceConfigInfo'
                }).then(function(response){
                    var result = [];
                    response.deviceConfigInfo.device.forEach(
                        function(device){
                            result.push(
                                new Lamp(
                                    device.DevUUID,
                                    device.CurrentState === '1'
                                ));
                        });

                    return result;
                });
            },

            set: function(lamp){
                return send({
                    method: 'POST',
                    path: 'smartplug/setTarget',
                    data: parser.toUrlEnc(
                        {
                            devUuid : lamp.id,
                            state: lamp.state ? 1 : 0
                        })
                });
            }
        }

    };
});
