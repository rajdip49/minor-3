const searchbtn = document.getElementById("searchbtn");
const loadbtn = document.getElementById("loadbtn");

const resultbox = document.querySelector(".result"); 
const searchinput = document.getElementById("search-input");

async function search() {
    
    const city = searchinput.value.trim().toLowerCase();

    if (city === "") {
        // NEW: Handles empty searches gracefully
        resultbox.innerHTML = `<p class="empty-msg" style="color: #ff4757;">Please enter a city name</p>`;
        return;
    }

    // NEW: Adds a temporary loading message while the API fetches
    resultbox.innerHTML = `<p style="color: #00d2ff;">Fetching weather...</p>`;

    const wurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aff44e1c46e4dbe465b2896121197079&units=metric`;

    try {
        const res = await fetch(wurl);
        const data = await res.json();

    
        if (data.cod === "404" || !res.ok) {
            throw new Error("Unable to load weather condition");
        }

        
        display(data);

    } catch(error) {
        console.log(error);
        
        // CHANGED: Clears the loading text before showing the error
        resultbox.innerHTML = ""; 
        const msg = document.createElement("p");
        msg.className = "empty-msg";
        msg.textContent = "Could not Load Data. City may not exist.";
        msg.style.color = "#ff4757"; // NEW: Styled the error text so it is visible

  
        resultbox.appendChild(msg);
    }
}

function display(data) {
    
    resultbox.innerHTML = ""; 

    
    const card = document.createElement("article");
    card.className = "forecast-card";

    const temp = document.createElement("h3");
    temp.textContent = "Temperature: " + data.main.temp + " °C";

    const feels = document.createElement("h3");
    feels.textContent = "Feels Like: " + data.main.feels_like + " °C";

    const pressure = document.createElement("h3");
    pressure.textContent = "Pressure: " + data.main.pressure + " hPa"; // CHANGED: Standard pressure unit

    const country = document.createElement("h3");
    country.textContent = "Location: " + data.name + ", " + data.sys.country; // NEW: Added city name alongside country

    // CHANGED: Fixed capitalization of appendChild
    card.appendChild(temp);
    card.appendChild(feels);
    card.appendChild(pressure);
    card.appendChild(country);

    resultbox.appendChild(card);
}

// events
searchbtn.addEventListener('click', search);

searchinput.addEventListener('keydown', function(event) {
   
    if (event.key === "Enter") {
        search();
    }
});