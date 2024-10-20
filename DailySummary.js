import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DailySummary.css'; // Importing CSS for styling

const DailySummary = ({ selectedCity }) => {
    const [dailySummaries, setDailySummaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDailySummaries = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/daily-summaries?city=${selectedCity}`);
                setDailySummaries(response.data);
            } catch (err) {
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDailySummaries();
    }, [selectedCity]); // Fetch data whenever the selected city changes

    if (loading) {
        return <div className="loading">Loading...</div>; // Loading spinner
    }

    if (error) {
        return <div className="error">{error}</div>; // Error message
    }

    return (
        <div className="daily-summary-container">
            <h2>Daily Summaries for {selectedCity}</h2>
            {dailySummaries.length > 0 ? (
                <ul>
                    {dailySummaries.map((summary, index) => (
                        <li key={index}>
                            <span>{summary.date}</span>
                            <span>{summary.dominant_condition}</span>
                            <span>Avg: {summary.avg_temp.toFixed(2)}°C</span>
                            <span>Max: {summary.max_temp.toFixed(2)}°C</span>
                            <span>Min: {summary.min_temp.toFixed(2)}°C</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No daily summaries available for {selectedCity}.</p>
            )}
        </div>
    );
};

export default DailySummary;