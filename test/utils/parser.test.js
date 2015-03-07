describe("Name of the group", function() {

    function jsonToFormUrlencoded(params){
        var result = [];
        for(var attr in params){
            result.push(attr, '=', params[attr], '&');
        }
        // remove '&' at the end
        result.pop();
        return result.join('');
    }

    /*beforeEach(function(done) {
        var that = this;
        define(['utils/parser'],function(parser){
            that.parser = parser;
            done();
        });
    });*/

    it("should behave...", function() {
        expect(jsonToFormUrlencoded({})).toBe('');
        expect(
            jsonToFormUrlencoded(
                {
                    devUuid : 'b2-haet-0483:happ_smartplug_644EAC423D7',
                    state: 1
                })
            )
            .toBe("devUuid=b2-haet-0483:happ_smartplug_644EAC423D7&state=1");
    });
});