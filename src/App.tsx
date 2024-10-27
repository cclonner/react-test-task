import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
    const [variables, setVariables] = useState<string[]>(['rain_sum', 'snowfall_sum']);
    const allVariables = [
        'weathercode', 'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max', 'apparent_temperature_min', 
        'sunrise', 'sunset', 'precipitation_sum', 'rain_sum', 'showers_sum', 'snowfall_sum', 'precipitation_hours', 
        'windspeed_10m_max', 'windgusts_10m_max', 'winddirection_10m_dominant', 'shortwave_radiation_sum', 'et0_fao_evapotranspiration'
    ];

    const handleAddVariable = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (!variables.includes(value)) {
            setVariables([...variables, value]);
        }
    };

    return (
        <div className="main">
            <div>
                <label>
                    <select onChange={handleAddVariable} value="">
                        <option value="" disabled>Выберите параметр</option>
                        {allVariables.map(variable => (
                            <option key={variable} value={variable}>
                                {variable}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <Weather lat={55.751244} long={37.618423} variables={variables} />
        </div>
    );
}

export default App;
