import React from 'react';
import styles from './SearchBox.module.css'

function SearchBoxFriends(props: any) {
    return (
        <div className={styles.SearchContainer}>
                <input className={styles.textSearch}/>
                <button className={styles.ButtonSearch}>Найти</button>
        </div>
    )
}

export default SearchBoxFriends;