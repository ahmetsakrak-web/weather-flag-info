import React, { useState, useEffect } from "react";
import "./App.scss";
const App = () => {
  const [data, setData] = useState([]);
  const [tdata, setTdata] = useState([]);
  const [isIds, setIsIds] = useState({});
  const [weather, setWeather] = useState({});

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  console.log(API_KEY);
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const typing = (e) => {
    const eslesenVeri = data.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setTdata(eslesenVeri);
  };

  const viewImg = (id, name) => {
    setIsIds((prevIds) => {
      return Boolean(!prevIds[id])
        ? { ...prevIds, [id]: true }
        : { ...prevIds, [id]: false };
    });

    fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${name}`
    )
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        console.log(data);

        setWeather(data.current);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
        <h3>weather of countries</h3>
      <input type="text" onChange={typing} />
      {tdata.length < 10 ? (
        <div>
          {tdata.map((item) => {
            return (
              <div className="item" key={item.population}>
                <h3>{item.name}</h3>
                <button onClick={() => viewImg(item.population, item.name)}>
                  Show Flag
                </button>

                {isIds[item.population] ? (
                  <>
                    <img alt={item.name} src={item.flag} />
                    <h4> Temperature: {weather.temperature}</h4>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <h3>Veri çok fazla</h3>
      )}
    <small>Protokol https olduğu için hava durumu gözükmemekte. Local bilgisayara indirip görebilirsiniz <a href="https://github.com/ahmetsakrak-web/weather-flag-api">Link</a></small>
    </div>
  );
};

export default App;
