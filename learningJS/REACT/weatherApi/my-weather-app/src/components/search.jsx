import React, { useState } from "react";

const Search=({fetchWeather})=>{
    const [city, setCity]=useState('');

    const handleSearch=(e)=>{
        e.preventDefault();
        fetchWeather(city);
        setCity('');
    };
    return (
        <form onSubmit={handleSearch} className="searchform">
            <input type="text" value={city} onChange={(e)=> setCity(e.target.value)} placeholder="Enter city name" className="input"/>
            <button type="submit" className="button">Get Weather</button>
        </form>
    );
};
export default Search;