import React, { useEffect, useState } from 'react';
import './Weather.css';

interface WeatherData {
    daily: {
        time: string[];
        [key: string]: string[] | number[];
    };
}

interface Props {
    lat: number;
    long: number;
    variables: string[];
}

const Weather: React.FC<Props> = ({ lat, long, variables }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${variables.join(
                        ','
                    )}&timezone=Europe/Moscow&past_days=7`
                );
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error('Error fetch', error);
            }
        };
        fetchWeather();
    }, [lat, long, variables]);

    return (
        <table className="weather-table">
            <thead>
                <tr>
                    <th>Date</th>
                    {variables.map((variable) => (
                        <th key={variable}>{variable}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {weather &&
                    weather.daily.time.map((time, index) => (
                        <tr key={time}>
                            <td>{time}</td>
                            {variables.map((variable) => (
                                <td key={variable}>
                                    {weather.daily[variable]?.[index] ?? 'н/д'}
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default Weather;
