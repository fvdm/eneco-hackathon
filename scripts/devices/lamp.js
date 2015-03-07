define('devices/lamp', [], function(){

    /*
     * @class Lamp
     * @constructor
     * @param {String} id
     * @param {Boolean} state on/off
     */
    function Lamp(id, state) {
        this.id = id;
        this.state = state || false;
    }

    /**
     * Turn on the light
     * @returns {Promise}
     */
    Lamp.prototype.on = function(){
        var api = require('eneco/toon');
        this.state = true;
        return api.lamps.set(this);
    };

    /**
     * Turn off the light
     * @returns {Promise}
     */
    Lamp.prototype.off = function(){
        var api = require('eneco/toon');
        this.state = false;
        return api.lamps.set(this);
    };

    return Lamp;
});