var request = require('request');
var forecast = (lattitude,longitude, callback) => {
    var url ='http://api.weatherstack.com/current?access_key=03fdd6037dc1fa202e14ed67a6306e00&query='+lattitude+","+longitude;

    request({url , json : true}, (error, response)=>{
        if(error)
         callback('unable to connect to server',undefined);

        //  else if(response.body.location.name === null)
        //   callback('no search results found', undefined);

          else{
         callback(undefined,"the current temp is "+response.body.current.temperature + "  and humidity in percentage is " + response.body.current.humidity);
          }
    })

}


module.exports = forecast;

// forecast(-74.3893168105238,40.1502478924, (error, data) =>{
//     console.log('error ', error);
//     console.log('data ', data);
// })





