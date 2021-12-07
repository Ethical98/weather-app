import request from 'postman-request';

const geocode = (address, callback) => {
  //https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGV2YW5zaGc5OCIsImEiOiJja3duc3FwOGQyOTExMndtZHJ5ZGpsNWx4In0.-oKVj83Pzs0FCgcbhJhMBg&limit=1
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGV2YW5zaGc5OCIsImEiOiJja3duc3FwOGQyOTExMndtZHJ5ZGpsNWx4In0.-oKVj83Pzs0FCgcbhJhMBg&limit=1`;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  request(url, { json: true }, (error, response, body) => {
    if (error) {
      callback('Unable To connect To location services');
    } else if (body.message) {
      callback('Unable to find location entered');
    } else {
      const latitude =
        body && body.features.length > 0
          ? body.features[0].center[1]
          : undefined;
      const longitude =
        body && body.features.length > 0
          ? body.features[0].center[0]
          : undefined;
      const location =
        body && body.features.length > 0
          ? body.features[0].place_name
          : undefined;

      callback('', {
        latitude,
        longitude,
        location,
      });
    }
  });
};

export default geocode;
