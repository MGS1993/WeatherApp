import React from "react";
import styles from "./WeatherModule.module.css";
import WeatherIcon from "../../StatusIcon/WeatherIcon";

const weatherModule = (props) => {
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let currentDate = `${month}/${date}`;

  return (
    <div className={styles.moduleWrapper}>
      <div className={styles.moduleMainInfo}>
        <div className={styles.tempReading}>
          <div className={styles.dateDivWrapper}>
            <div className={styles.tempTitle}>Current Weather</div>
            <div className={styles.date}>{currentDate} {props.location}</div>
          </div>
          <div className={styles.minMax}>
            <p>Min temp: {props.min}</p>
            <p>Max temp: {props.max}</p>
          </div>
          <div className={styles.tempTextWrapper}>
            <WeatherIcon icon={props.icon} weatherDesc={props.weatherDesc} />
            <div className={styles.tempTextDiv}>
              <p className={styles.tempText}>{props.temp}</p>
              <p className={styles.tempTextMisc}>
                Feels like: {props.feelsLike}
              </p>
            </div>
          </div>
          <div className={styles.miscTemp}>
            <p>humidity: {props.humidity}</p>
            <p>Pressure: {props.pressure}</p>
          </div>
        </div>
        <div className={styles.forecast}>
          <div className={styles.forecastDiv}>
            <p className={styles.forecastDate}>{props.date0}</p>
            <p className={styles.forecastTemp}>{props.day0TempReading}</p>
          </div>
          <div className={styles.forecastDiv}>
            <p className={styles.forecastDate}>{props.date1}</p>
            <p className={styles.forecastTemp}>{props.day1TempReading}</p>
          </div>
          <div className={styles.forecastDiv}>
            <p className={styles.forecastDate}>{props.date2}</p>
            <p className={styles.forecastTemp}>{props.day2TempReading}</p>
          </div>
          <div className={styles.forecastDiv}>
            <p className={styles.forecastDate}>{props.date3}</p>
            <p className={styles.forecastTemp}>{props.day3TempReading}</p>
          </div>
          <div className={styles.forecastDiv}>
            <p className={styles.forecastDate}>{props.date4}</p>
            <p className={styles.forecastTemp}>{props.day4TempReading}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default weatherModule;
