import React from 'react';
import styles from './WeatherIcon.module.css';

const WeatherIcon = (props) => {
  return (
  <div className={styles.iconWrapper}>
    <div className={styles.weatherDesc}>
      <p>{props.weatherDesc}</p>
      <img className={styles.weatherImg} src={`http://openweathermap.org/img/wn/${props.icon}.png`} alt="current weather status"/>
      </div>
    
    
  </div>
  )
  
}

export default WeatherIcon 