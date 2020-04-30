const request = require('postman-request')

const forecast = ({latitude, longitude}, callback) => {
    const url =`http://api.weatherstack.com/current?access_key=0c98e8d2c433c76a521e234f62f0a4ee&query=${latitude},${longitude}`;

    request({url, json: true}, (error, response, body) => {
        if(error){
            callback('Unable to connect with weather service!', undefined);
        } else if(body.success === false){
            callback( body.error.info, undefined );
        } else{
            data = `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike} `;            
            callback(undefined,data);
        }
    });
}

module.exports = forecast;