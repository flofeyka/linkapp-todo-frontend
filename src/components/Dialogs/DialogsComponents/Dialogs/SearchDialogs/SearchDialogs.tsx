import React from 'react'
import styles from "./SearchDialogs.module.css"

function SearchDialogs() {
    return <div className={styles.SearchContainer}>
            <span>
                <input className={styles.SearchBox} placeholder="Поиск"/>
            </span>
        <span>
                <button className={styles.SearchBoxButton}>Search</button>
            </span>
    </div>
}

export default SearchDialogs;