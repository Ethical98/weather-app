const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const getWeatherData = async (location) => {
  const {
    data: { error, forecast, location: add },
  } = await axios.get(`/weather?address=${location}`);
  if (error) {
    messageOne.textContent = error;
  } else {
    messageOne.textContent = add;
    messageTwo.textContent = forecast;
  }
};

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading....';
  messageTwo.textContent = '';
  getWeatherData(location);
});
