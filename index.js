const inputval = document.querySelector('#cityinput');
const btn = document.querySelector('#add');
const city = document.querySelector('#cityoutput');
const description = document.querySelector('#description');
const temp = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const wrapper = document.querySelector('.wrapper'); // Get the wrapper element

const apik = "3045dd712ffe6e702e3245525ac7fa38";

// kelvin to celsius. 1 Kelvin is equal to -272.15 Celsius.
function convertion(val) {
    return (val - 273).toFixed(2);
}

btn.addEventListener('click', function() {
    const cityName = inputval.value.trim();

    if (cityName !== '') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apik}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                const nameval = data['name'];
                const descrip = data['weather'][0]['description'];
                const tempature = data['main']['temp'];
                const wndspd = data['wind']['speed'];

                // Update the content and show the wrapper
                city.innerHTML = `Weather of <span>${nameval}</span>`;
                temp.innerHTML = `Temperature: <span>${convertion(tempature)} C</span>`;
                description.innerHTML = `Sky Conditions: <span>${descrip}</span>`;
                wind.innerHTML = `Wind Speed: <span>${wndspd} km/h</span>`;
                 // Clear the input
                 inputval.value = '';

                // Show the wrapper now that we have data
                wrapper.style.display = 'block';
            })
            .catch(err => {
                alert('There was an error fetching the weather data. Please check the city name and try again.');
                console.error('Error:', err);
            });
    } else {
        alert('Please enter a city name.');
    }
});
