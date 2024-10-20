import React, { useState } from 'react';
import Weather from './Weather';
import DailySummary from './DailySummary';
import './App.css'; // Importing CSS for styling

const App = () => {
    const [selectedCity, setSelectedCity] = useState('Delhi'); // Default city
    const [cities] = useState(['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad']); // List of cities

    const handleCityChange = (city) => {
        setSelectedCity(city);
    };

    return (
        <div className="app-container">
            <h1>Weather Monitoring Application</h1>
            <div className="city-selector">
                <label htmlFor="city">Select City: </label>
                <select id="city" value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <Weather selectedCity={selectedCity} onCityChange={handleCityChange} />
            <DailySummary selectedCity={selectedCity} />
        </div>
    );
};

export default App;