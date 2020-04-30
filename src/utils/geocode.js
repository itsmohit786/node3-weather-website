const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(address) }.json?access_token=pk.eyJ1IjoibW9oaXRzaGFybWExOTg2IiwiYSI6ImNrOWZmMTFpcTA1MWkzbHBudzFwdXJvcmEifQ.B1k7qaY1VtOCNYRujAaJ9A&limit=1`

    request( { url, json:true }, (error, response, body) => {

        if(error){
            callback('Unable to connect to Geo Services!!', undefined)
        } else if( body.features.length === 0 ){
            callback('Unable to find the provided location', undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude  = body.features[0].center[1];
            const placeName = body.features[0].place_name;
            // data = { latitude, longitude, placeName }
            callback(undefined, { latitude, longitude, placeName });
        }
    })
}

module.exports = geocode;