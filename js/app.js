
var weatherAPI = "http://api.wunderground.com/api/2e843102da35bfb9/conditions/q/40047.json";
var weatherMethod = function(data) {
    console.log(data);
    // var currentTemp = '<h1> ' + data.current_observation.temp_f + 'F </h1>';
    // $('.main-image a').before(currentTemp);
};

$.getJSON(weatherAPI, weatherMethod);

