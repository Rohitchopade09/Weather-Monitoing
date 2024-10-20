import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css'; // Importing CSS for styling

const Weather = ({ selectedCity, onCityChange }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad']; // List of cities

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch daily summaries for the selected city
                const summaryResponse = await axios.get(`http://localhost:5000/summaries?city=${selectedCity}`);
                setWeatherData(summaryResponse.data);

                // Fetch alerts for the selected city
                const alertsResponse = await axios.get(`http://localhost:5000/alerts?city=${selectedCity}`);
                setAlerts(alertsResponse.data);
            } catch (err) {
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [selectedCity]); // Fetch data whenever the selected city changes

    const handleCityChange = (event) => {
        onCityChange(event.target.value);
    };

    if (loading) {
        return <div className="loading">Loading...</div>; // Loading spinner
    }

    if (error) {
        return <div className="error">{error}</div>; // Error message
    }

    return (
        <div className="weather-container">
            <h2>Weather Information for {selectedCity}</h2>
            <div className="city-selector">
                <label htmlFor="city">Select City: </label>
                <select id="city" value={selectedCity} onChange={handleCityChange}>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            <h3>Daily Summaries</h3>
            {weatherData.length > 0 ? (
                <ul>
                    {weatherData.map((data, index) => (
                        <li key={index}>
                            <span>{data.date}</span>
                            <span>{data.dominant_condition}</span>
                            <span>Avg: {data.avg_temp.toFixed(2)}°C</span>
                            <span>Max: {data.max_temp.toFixed(2)}°C</span>
                            <span>Min: {data.min_temp.toFixed(2)}°C</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No weather data available for {selectedCity}.</p>
            )}

            <h3>Alerts</h3>
            {alerts.length > 0 ? (
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index} className="alert">
                            <span>{alert.city}</span>
                            <span>{alert.alert_type}</span>
                            <span>{alert.alert_message}</span>
                            <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No alerts at this time.</p>
            )}
        </div>
    );
};

export default Weather;