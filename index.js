const submitButton = document.querySelector('.submit-button')
const beginningModal = document.querySelector('.beginning-modal')
const beginningTitle = document.querySelector('.begtitle')
const searchInput = document.querySelector('.search-input')
const researchButton = document.querySelector('.researchbutton')
const researchBar = document.querySelector('.researchbar')

let city = "";

submitButton.addEventListener('click', () => {
    if (searchInput.value != "") {
        beginningModal.style.display = "none";
        beginningTitle.style.display = "none";
        
        document.querySelector('.main-body').style.display = "flex";
        populateElements(`${searchInput.value}`)

    } else {
        alert("You must type something in before submitting!")
    }
})

researchButton.addEventListener('click', () => {
    if (researchBar.value != "") {        
        console.log(researchBar.value)
        populateElements(`${researchBar.value}`)

    } else {
        alert("You must type something in before submitting!")
    }
})


async function getWeatherData(place) {
    let dataString = await fetch(`https://api.weatherapi.com/v1/current.json?key=3880b02f38bb4ea8aa703431231005&q=${place}`, {
        mode: 'cors'
    });

    let realData = await dataString.json()
    console.log(realData)
    return realData;
}

async function getMoreData(place) {
    try {
        let newData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3880b02f38bb4ea8aa703431231005&q=${place}&days=7`, {
        mode: 'cors'
        });

        let newRealData = await newData.json();
        return newRealData
    } catch (error) {
        console.log("DId not work")
    }

}

function formatDate(dateString) {
    const months = [
      "January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"
    ];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }
    const year = date.getFullYear();
    return `${month} ${day}${daySuffix}, ${year}`;
}

async function populateElements(place) {
    const weatherData = await getWeatherData(`${place}`);
    const moreWeatherData = await getMoreData(`${place}`)
    console.log(moreWeatherData)

    if ((weatherData.current.feelslike_f) >= 80) {
        document.body.style.background = `linear-gradient(90deg, rgba(255,193,7,1) 0%, rgba(255,191,0,1) 35%, rgba(255,128,0,1) 100%)`;
        document.querySelector('.weatherdesc').style.color = 'white'
    } else if ((weatherData.current.feelslike_f) <= 40) {
        document.body.style.background = `linear-gradient(90deg, rgba(22,88,115,1) 0%, rgba(135,206,235,1) 50%, rgba(211,211,211,1) 100%)`;
        document.querySelector('.weatherdesc').style.color = 'white'
    }

    for (let num = 0; num < 7; num++) {

        if (document.querySelector('#unit').value == 'C') {
            document.querySelector(`.day${num}temp`).textContent = `${moreWeatherData.forecast.forecastday[num].day.avgtemp_c} °C`
        } else if (document.querySelector('#unit').value == 'F') {
            document.querySelector(`.day${num}temp`).textContent = `${moreWeatherData.forecast.forecastday[num].day.avgtemp_f} °F`
        }

        document.querySelector(`.day${num}date`).textContent = `${formatDate(moreWeatherData.forecast.forecastday[num].date)}`
        document.querySelector(`.day${num}title`).textContent = `${moreWeatherData.forecast.forecastday[num].day.condition.text}`
    }

    console.log(document.querySelector('#unit').value)
    if (document.querySelector('#unit').value == 'C') {
        document.querySelector('.localtemp').textContent = `${weatherData.current.feelslike_c} °C`
    } else if (document.querySelector('#unit').value == 'F') {
        document.querySelector('.localtemp').textContent = `${weatherData.current.feelslike_f} °F`
    }

    // Main title set to place and country
    document.querySelector('.location').textContent = `${place}, ${weatherData.location.country}`

    // Subtitle set to condition
    document.querySelector('.weatherdesc').textContent = `${weatherData.current.condition.text}`


    // document.querySelector('.localtemp').textContent = `${weatherData.current.feelslike_f} °F`

    // Local Time set to local time
    document.querySelector('.localtime').textContent = `${weatherData.location.localtime}`
    
    // Wind Speed set to wind speed 
    document.querySelector('.localwind').textContent = `${weatherData.current.gust_mph} mph`

    // Humids set to to humids
    document.querySelector('.localhumidity').textContent = `${weatherData.current.humidity}%`

    // Precips set to precipitation
    document.querySelector('.localprecip').textContent = `${weatherData.current.precip_in} inches`

    // Region set to Region
    document.querySelector('.localregion').textContent = `${weatherData.location.region}`
}
