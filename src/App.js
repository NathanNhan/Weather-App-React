import React, { useState, useEffect } from 'react'
import './index.css';
import loadingGif from './assets/preloader.gif';

const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=`
function App() {
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState({show:false,msg:""});
  const [data, setdata] = useState([]);
  const [query, setquery] = useState('London');
  const containerInput = React.useRef(null);
  const fetchData = async (url) =>{
    setLoading(false);
    try {
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const {name} = data;
      const {temp,humidity} = data.main;
      const {main} = data.weather[0];
      const {country} = data.sys;
      const {icon} = data.weather[0];
      const newData = {name,temp,humidity,main,country,icon};
      
      setdata(newData);
      setLoading(false)
      setError(false)
    } catch (error) {
      setError({show:true,msg:error.message})
    }
  }
  // date 
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
 

  useEffect(() => {
    fetchData(`${API_ENDPOINT}${query}&appid=${process.env.REACT_APP_MOVIE_API_KEY}&units=metric`);
    // eslint-disable-next-line
  }
  , [query])

   if (Loading) {
    return (
      <div className="wrapper">
        <img src={loadingGif} alt="spinner"/>
      </div>
    )
  }
  
  const {name,temp,main,country,icon} = data;
  return (
       <main className={temp > 20 ? 'app warm' : 'app'}>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setquery(e.target.value)}
            value={query}
            rel={containerInput}
          />
          {Error.show && <div className="error">{Error.msg}</div>}
        </div>
        
        <div>
          <div className="location-box">
            <div className="location">{name},{country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather conditions"/>
              {Math.round(temp)}°c
            </div>
            <div className="weather">{main}</div>
          </div>
        </div>
        
      </main>
  );
}

export default App;
