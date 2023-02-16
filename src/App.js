import './App.css';
import Input from './components/Input';
import TimeAndLocation from './components/TimeAndLocation';
import TemparatureAndDetails from './components/TemparatureAndDetails';
import Forcast from './components/Forcast';
import getFormattedWeatherData from './services/weatherService';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  
const [query,setQuery] = React.useState({q:"tokyo"});
const [units, setUnits] = React.useState("metric");
const [weather, setWeather] = React.useState(null);

React.useEffect(() => {
  const fetchWeather = async () => {
    const message = query.q ? query.q : "current location.";

    toast.info("Fetching weather for " + message);

    await getFormattedWeatherData({ ...query, units }).then((data) => {
      toast.success(
        `Successfully fetched weather for ${data.name}, ${data.country}.`
      );

      setWeather(data);
    });
  };

  fetchWeather();
}, [query, units]);

  
const formatBackground = () => {
  if (!weather) return "from-cyan-700 to-blue-700";
  const threshold = units === "metric" ? 20 : 60;
  if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

  return "from-yellow-700 to-orange-700";
}


  
  return (
    
    <div className={`mx-auto py-5 px-32  bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <Input setQuery={setQuery} units={units} setUnits={setUnits} />
      { weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemparatureAndDetails weather={weather} />
          <Forcast title="hourly forecast" items={weather.hourly} />
          <Forcast title="daily forecast" items={weather.daily} />
        </div>
      )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true}/>
    </div>
    
  );
}



export default App;

// apiKey = 23cff21c5668027d6f6fdbcae30c6af8