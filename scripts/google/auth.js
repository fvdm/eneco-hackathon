define('google/auth', [], function(){

    var clientId = '906313224959-qhctgjkh7m113q45rdeue5mb2kr676si.apps.googleusercontent.com';
    var apiKey = 'AIzaSyCNOrNk_c4qfrv2OJsJQvU7F9jlRWnGNAo';
    var scopes = 'https://www.googleapis.com/auth/plus.me ' +
                 'https://www.googleapis.com/auth/calendar.readonly';

    function checkAuth(callback) {
        gapi.client.setApiKey(apiKey);
        gapi.auth.authorize(
          {
            client_id: clientId,
            scope: scopes,
            immediate: true,
            cookie_policy: 'single_host_origin'
          },
          callback
        );
    }

    return {

        isAuthenticated: function(){
            return new Promise(function(fulfill, reject){
                checkAuth(function(authResult){
                    console.log('[google] isAuthenticated', authResult);

                    if (authResult && !authResult.error) {
                        fulfill();
                    }else{
                        reject();
                    }
                });
            });
        },

        login: function(success, error){
            var that = this;
            return new Promise(function(fulfill, reject){
                gapi.auth.authorize(
                    {client_id: clientId, scope: scopes, immediate: false},
                    function(){
                        that.isAuthenticated().then(fulfill, reject);
                    });
            });
        }
    };
});