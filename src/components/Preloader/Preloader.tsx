import React from 'react';
import loader from '../../assets/loader.gif';
import styles from "./Preloader.module.css"

function Preloader(props:any) {
    return <div className={styles.Preloader}>
        <img src={loader} alt="Loader for unload's pages"/>
    </div>
}

export default Preloader;