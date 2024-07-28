import Search from "../search";
import {useEffect, useState} from "react";


export default function Weather() {
    const [search, setSearch] = useState('uzhhorod')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState(null)

    const APIKey = '';

    const fetchWeatherData = async (param) => {
        setLoading(true)

        try {
           const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIKey}`);

            const data = await response.json();

            if (data) {
                setWeatherData(data)
                setLoading(false)
            }
        } catch(error) {
            console.error(error)
            setLoading(false)
        }
    }

    const handleSearch = () => {
        fetchWeatherData(search)
    }

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    }

    useEffect(() => {
        fetchWeatherData('uzhhorod')
    }, []);

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {
                loading ?
                    <div className="loading">Loading..</div>
                    : <div>
                        <div className="city-name">
                            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                        </div>
                        <div className="date">
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className="temperature">
                            {weatherData?.main?.temp}
                        </div>
                        <p className="description">
                            {weatherData && weatherData?.weather && weatherData?.weather[0] ?
                                weatherData?.weather[0].description
                                : ''
                            }
                        </p>
                        <div className="weather-info">
                            <div className="column">
                                <div>
                                    <p className="wind">{weatherData?.wind?.speed}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                            <div className="column">
                                <div>
                                    <p className="humidity">{weatherData?.wind?.humidity}</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}