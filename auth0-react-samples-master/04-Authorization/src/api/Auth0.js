//https://auth0.com/docs/metadata/apis

const request = require('request');
class Auth0 {
	constructor(){
     
    }

    async createPreference(field, data, user_email){
        var request = require("request");
        var options = { method: 'POST',
        url: 'https://planatrip.auth0.com/api/v2/users-by-email/' + user_email,
        headers: 
        { 'content-type': 'application/json',
        'Authorization': 'Bearer ' + process.env.AUTH0_APIV2_TOKEN },
        body: 
        {
            user_metadata: { field: data},
            app_metadata: { plan: 'normal' } } ,
            json: true };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
                console.log(body);
        });

    }

     async getPreference(field, token, user_email){
        var request = require("request");
        var options = { method: 'GET',
        url: 'https://planatrip.auth0.com/api/v2/users-by-email/' + user_email,
        qs: { fields: 'user_metadata', include_fields: 'true' },
        headers: 
         { 'content-type': 'application/json',
         'Authorization': 'Bearer ' + process.env.AUTH0_APIV2_TOKEN } };
     
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
            console.log(body);
        });
    }

    async updatePreference(field, token, data, user_email){
        var request = require("request");
        var options = { method: 'PATCH',
        url: 'https://planatrip.auth0.com/api/v2/users-by-email/' + user_email,
        headers: 
         { 'content-type': 'application/json',
           authorization:  'Bearer' +  process.env.AUTH0_APIV2_TOKEN },
        body: 
         { user_metadata: { addresses: { home: '123 Main Street, Anytown, ST 12345' } } },
        json: true };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
            console.log(body);
        });
    }

}

export default Auth0;