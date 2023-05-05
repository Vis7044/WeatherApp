import React, { useState, useEffect} from "react";
import axios from "axios"
import "./index.css"
import {Api_token} from "./token"


const key = Api_token

function App() {
  const [city, setCity] = useState("")
  const [apidata, setApidata] = useState({})
  const [ent, setEnt] = useState(0)
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  function componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
      console.log(lat)
      console.log(long)
    });
  }




  // const c = "kolkata"
  const handleChange = (event) => {
    setCity(event.target.value);
  };



  useEffect(() => {
    componentDidMount()
    const handle = async () => {
      if (city === '') {
        var res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`)
      } else {
        var res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
      }
      setCity('')
      setApidata(res.data)
      console.log(apidata)
    }
    handle()
  }, [ent, lat])

  const hand = (e) => {
    if (e.key === 'Enter') {
      setEnt(ent + 1)
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  return (
    <div className={Object.keys(apidata).length>0?(apidata.main.temp>20)?"App warm":"App":"App"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            name="city"
            onChange={handleChange}
            value={city}
            onKeyPress={hand}
          />
        </div>

        <div className="location-box">
          <div className="location">
            {Object.keys(apidata).length>0?apidata.name:"Enter City"}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temperature">
            {Object.keys(apidata).length>0?Math.round(apidata.main.temp) + "°C":""}
          </div>
          <div className="weather">
            {Object.keys(apidata).length>0?apidata.weather[0].description:""}

          </div>
        </div>

      </main>

    </div>
  );
}

export default App;
