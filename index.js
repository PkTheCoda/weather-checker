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

async function getMoreData() {
    try {
        let newData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3880b02f38bb4ea8aa703431231005&q=london&days=7`, {
        mode: 'cors'
        });

        let newRealData = await newData.json();
        return newRealData
    } catch (error) {
        console.log("DId not work")
    }

}

async function populateElements(place) {
    const weatherData = await getWeatherData(`${place}`);
    const moreWeatherData = await getMoreData()
    console.log(weatherData)
    console.log(moreWeatherData)

    // Main title set to place and country
    document.querySelector('.location').textContent = `${place}, ${weatherData.location.country}`

    // Subtitle set to condition
    document.querySelector('.weatherdesc').textContent = `${weatherData.current.condition.text}`

    // Local Temp set to local temp
    document.querySelector('.localtemp').textContent = `${weatherData.current.feelslike_f} °F`

    // Local Time set to local time
    document.querySelector('.localtime').textContent = `${weatherData.location.localtime}`

    // Wind Speed set to wind speed 
    document.querySelector('.localwind').textContent = `${weatherData.current.gust_mph}`

    // Humids set to to humids
    document.querySelector('.localhumidity').textContent = `${weatherData.current.humidity}%`

    // Precips set to precipitation
    document.querySelector('.localprecip').textContent = `${weatherData.current.precip_in} inches`

    // Region set to Region
    document.querySelector('.localregion').textContent = `${weatherData.location.region}`
}

