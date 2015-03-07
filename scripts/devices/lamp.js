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

    Lamp.prototype.on = function(){
        var api = require('eneco/toon');
        this.state = true;
        api.lamps.set(this);
    };

    Lamp.prototype.off = function(){
        var api = require('eneco/toon');
        this.state = false;
        api.lamps.set(this);
    };

    return Lamp;
});