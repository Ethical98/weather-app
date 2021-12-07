import request from 'postman-request';

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4907efe247739a5ef1702e6bc5e77f89&query=${latitude},${longitude}`;

  request(url, { json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      callback(
        '',
        `${body.current.weather_descriptions[0]}.It is current ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

export default forecast;
