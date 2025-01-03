import "../Comps.css/SearchBar.css";
import { useState } from "react";
const SearchBar = () => {
    const [city, setCity] = useState("");/*Set to empty string to be filled with string weather request*/
    const [weatherData, setWeatherData] = useState(null);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

        const [error, setError] = useState("");
    
        const handleSearch = async () => {
            if (!city.trim()) {
                setError("Please enter a city");
                return;
            }


            try {
                const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Virginia%2C%20City's?unitGroup=us&key=RQWTR6VEM7V5H9JZJ7W66AS9Z&contentType=json");
                console.log("apiCallSuccessfull!")
                if (!response.ok) {
                    throw new Error(`http error! status:${response.status}`);
                }
                const data = await response.json();
                setWeatherData(data);
                console.log("API Response:", data);
                setCity("");
            } catch (error) {
                console.error("error fetching weather data", error);
            }
        };

       /* useEffect(() => {
            if (city) {
            handleSearch();
            }
        }, [city]);*/
              

    return (
        <div>
            <h1 className="title">Virginia Weather Report</h1>
            <input 
            className="input" 
            type="text"
            value={city}
            placeholder="Enter City Name"
            onChange={handleInputChange}
            >
            </input>
            <button className="btn-search" onClick={handleSearch}>search</button>
            {weatherData && weatherData.currentConditions ? (
                <div>
                    <h3 className="weath-in"> Weather in {weatherData.address}</h3>
                    <p className="weath-data">{weatherData.description}</p>
                    <p className="temp">Temperature: {weatherData.currentConditions.temp} °C</p>
                    <p className="feels">Feels Like: {weatherData.currentConditions.feelslike} °C</p>
                    <p className="humid">Humidity: {weatherData.currentConditions.humidity}%</p>
                </div>
            ) : (
                <p className="p-instrct">Enter a city in Virginia to see the weather.</p>
            )}
            {error && <p className="error-message">{error}</p>}

            
            
                 
        </div>
    );
};

export default SearchBar;