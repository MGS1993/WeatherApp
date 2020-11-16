import React, { Component } from "react";
import "./App.css";
import Header from "../Components/Layout/Header/Header";
import WeatherModule from "../Components/Layout/WeatherModule/WeatherModule";

class App extends Component {
  state = {
    data: [{ temp: null, feelsLike: null, humidity: null }],
    misc: [{ pressure: null }],
    weather: [{ weatherDesc: null, icon: null }],
    searchInput: "",
    currentCity: "League City",
    weatherForecast: [
      {day0Temp: null, date: null},
      {day1Temp: null, date: null},
      {day2Temp: null, date: null},
      {day3Temp: null, date: null},
      {day4Temp: null, date: null},
    ],
  };

  async componentDidMount() {
    this.initialState();
  }

  initialState = async() => {
    try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.currentCity}&units=imperial&appid=37a3b9e0f8f6710c07f1a4500e3ec461`
    );
    const data = await response.json();
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.currentCity}&units=imperial&appid=37a3b9e0f8f6710c07f1a4500e3ec461`);
    const forecastData = await forecast.json();
      let fiveDayCast = [];
      for (var i = 0; i < forecastData.list.length; i+=8) {
        fiveDayCast.push(forecastData.list[i]);
      }
      console.log(fiveDayCast);

    await this.setState({
      data: [
        {
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
        },
      ],
      misc: [
        {
          pressure: data.main.pressure,
          tMax: data.main.temp_max,
          tMin: data.main.temp_min,
        },
      ],
      weather: [
        {
          weatherDesc: data.weather[0].description,
          icon: data.weather[0].icon,
        },
      ],
      weatherForecast: [
        {day0Temp: fiveDayCast[0].main.temp, date: fiveDayCast[0].dt_txt.slice(5,-8).replace('-','/') },
        {day1Temp: fiveDayCast[1].main.temp, date: fiveDayCast[1].dt_txt.slice(5,-8).replace('-','/') },
        {day2Temp: fiveDayCast[2].main.temp, date: fiveDayCast[2].dt_txt.slice(5,-8).replace('-','/') },
        {day3Temp: fiveDayCast[3].main.temp, date: fiveDayCast[3].dt_txt.slice(5,-8).replace('-','/') },
        {day4Temp: fiveDayCast[4].main.temp, date: fiveDayCast[4].dt_txt.slice(5,-8).replace('-','/') },
      ]
    });
    
  }catch(error){
    console.log('error')
  }
    
  };
  async updateState() {
    try {
      await this.setState({ currentCity: this.state.searchInput });
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.currentCity}&units=imperial&appid=37a3b9e0f8f6710c07f1a4500e3ec461`
      );
      const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.currentCity}&units=imperial&appid=37a3b9e0f8f6710c07f1a4500e3ec461`);
      const forecastData = await forecast.json();
      let fiveDayCast = [];
      for (var i = 0; i < forecastData.list.length; i+=8) {
        fiveDayCast.push(forecastData.list[i]);
      }
      const data = await response.json();
      
      this.setState({
        data: [
          {
            temp: data.main.temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
          },
        ],
        misc: [
          {
            pressure: data.main.pressure,
            tMax: data.main.temp_max,
            tMin: data.main.temp_min,
          },
        ],
        weather: [
          {
            weatherDesc: data.weather[0].description,
            icon: data.weather[0].icon,
          },
        ],
        weatherForecast: [
          {day0Temp: fiveDayCast[0].main.temp, date: fiveDayCast[0].dt_txt.slice(5,-8).replace('-','/')},
          {day1Temp: fiveDayCast[1].main.temp, date: fiveDayCast[1].dt_txt.slice(5,-8).replace('-','/')},
          {day2Temp: fiveDayCast[2].main.temp, date: fiveDayCast[2].dt_txt.slice(5,-8).replace('-','/')},
          {day3Temp: fiveDayCast[3].main.temp, date: fiveDayCast[3].dt_txt.slice(5,-8).replace('-','/')},
          {day4Temp: fiveDayCast[4].main.temp, date: fiveDayCast[4].dt_txt.slice(5,-8).replace('-','/')},
        ]
      });
      
    } catch (error) {
      console.log("oops!");
    }
  }
  
  changeCity = () => {
    this.updateState();
    
  };

  handleInputChange = (e) => {
    this.setState({ searchInput: e.target.value });
    
  };

  render() {

    return (
      <div className="App">
        <Header
          key="l1"
          searchBar={
            <input
              type="text"
              value={this.state.searchInput.input}
              onChange={this.handleInputChange}
            ></input>
          }
          clicked={this.changeCity}
        />
        <div className="backDrop">
          
          <WeatherModule
            location={this.state.currentCity}
            temp={this.state.data[0].temp + "°F"}
            feelsLike={this.state.data[0].feelsLike}
            humidity={this.state.data[0].humidity + "%"}
            pressure={this.state.misc[0].pressure + "hPa"}
            min={this.state.misc[0].tMin + "°F"}
            max={this.state.misc[0].tMax + "°F"}
            icon={this.state.weather[0].icon}
            weatherDesc={this.state.weather[0].weatherDesc}
            day0TempReading={this.state.weatherForecast[0].day0Temp + "°F"}
              date0={this.state.weatherForecast[0].date}
            day1TempReading={this.state.weatherForecast[1].day1Temp + "°F"}
              date1={this.state.weatherForecast[1].date}
            day2TempReading={this.state.weatherForecast[2].day2Temp + "°F"}
              date2={this.state.weatherForecast[2].date}
            day3TempReading={this.state.weatherForecast[3].day3Temp + "°F"}
              date3={this.state.weatherForecast[3].date}
            day4TempReading={this.state.weatherForecast[4].day4Temp + "°F"}
              date4={this.state.weatherForecast[4].date}
          />
        </div>
      </div>
    );
  }
}

export default App;
