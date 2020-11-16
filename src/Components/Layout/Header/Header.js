import React from 'react';
import styles from './Header.module.css';


const Header = (props) => {
  
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Weather App</h1>
        {props.searchBar}
      <button className={styles.enterBtn} onClick={props.clicked}>Get weather!</button>
    </header>
  )
}

export default Header