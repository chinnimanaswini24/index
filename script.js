const weatherForm = document.querySelector('.weatherform');
const cityInput = document.querySelector('.cityInput');

const card = document.querySelector('.card');
const cityDisplay = document.querySelector('.cityDisplay');
const tempDisplay = document.querySelector('.tempDisplay');
const humidityDisplay = document.querySelector('.humidityDisplay');
const descDisplay = document.querySelector('.descDisplay');
const weatherEmoji = document.querySelector('.weatherEmoji');
const errorDisplay = document.querySelector('.errorDisplay');

weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const city = cityInput.value.trim();
    if (city === '') {
        showError("Please enter a city");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=cf5823e695dd49d9b4991912252107&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        showError("City not found");
    }
});

function updateWeather(data) {
    const { name, country } = data.location;
    const { temp_f, humidity, condition } = data.current;

    cityDisplay.textContent = `${name}, ${country}`;
    tempDisplay.innerHTML = `${temp_f}&deg;F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = condition.text;
    weatherEmoji.textContent = getEmoji(condition.text);

    errorDisplay.style.display = 'none';
    card.style.display = 'flex';
}

function showError(message) {
    card.style.display = 'flex';
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
    cityDisplay.textContent = '';
    tempDisplay.textContent = '';
    humidityDisplay.textContent = '';
    descDisplay.textContent = '';
    weatherEmoji.textContent = '';
}

function getEmoji(description) {
    const desc = description.toLowerCase();
    if (desc.includes('sunny')) return '☀';
    if (desc.includes('cloud')) return '☁';
    if (desc.includes('rain')) return '🌧';
    if (desc.includes('thunder')) return '⛈';
    if (desc.includes('snow')) return '❄';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫';
    return '🌈';
}
