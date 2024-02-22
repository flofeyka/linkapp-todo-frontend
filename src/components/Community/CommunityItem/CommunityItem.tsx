import React from 'react';
import styles from "./CommunityItem.module.css";

function CommunityItem(props: any) {
    return <div className={styles.Communities}>
        <span className={styles.CommunityName}>
            {props.CommunityName}
        </span>
        <div>
            {props.Description}
        </div>
        <span>
            {props.SubscribesValue} подписчиков
        </span>
        <span>
            <img src={props.CommunitiesPhoto} alt=""/>
            <div>
                {!props.isFollowed ? <button onClick={() => {
                    props.setFollow(props.id, true)
                }}>
                    Подписаться
                </button> : <button onClick={() => {
                    props.setFollow(props.id, false)
                }}>Отписаться</button>}
            </div>
        </span>
    </div>
}

export default CommunityItem;