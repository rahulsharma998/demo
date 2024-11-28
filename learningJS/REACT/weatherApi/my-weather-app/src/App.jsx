import React, { useState } from "react";
import axios from 'axios';
import Search from "./components/search";
import Weather from "./components/weather";
 
const App= () =>{
    const [weatherData, setWeatherData]=useState(null);
    const [errorMessage, setErrorMessage]=useState("");

    const fetchWeather = async(city)=>{
        const apikey= "2c4db8453a6a0b47ce35d255ae6ce233";
        const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

        try{
            const response=await axios.get(url);
            setWeatherData(response.data);
            setErrorMessage('');
        } catch (error){
            console.error("Error fetching weather data", error);
            setErrorMessage('City not found. Please try again.');
            setWeatherData(null);
        }
    };
    
    return(
        <div className='appContainer'>
            <h1>Weather App</h1>
            <Search fetchWeather={fetchWeather}/>
            {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
            {weatherData && <Weather data={weatherData}/>}
        </div>
    );
};
export default App;