import {NavLink} from "react-router-dom";
import React from "react";
import styles from "./DialogsItem.module.css"
import unknownUser from "../../../../../assets/Profile/usersProfileIcon.png"


type propsType = {
    id: number
    logo: string
    name: string
    date: string
    lastMessage: string
}

function DialogItem(props: propsType) {


    return (
        <nav className={styles.pdialog}>
            <div className={styles.dialog + ' ' + styles.Active}>
                <NavLink to={"/dialogs/" + props.id}>
                    <button><img src={props.logo || unknownUser} alt=""/>
                        <div className={styles.nl}>
                            <div className={styles.name}>
                                {props.name}
                                <div className={styles.date}>
                                    {props.date}
                                </div>
                            </div>

                            <div className={styles.lastmessage}>
                                {props.lastMessage}
                            </div>
                        </div>
                    </button>
                </NavLink>
            </div>
        </nav>
    )
}


export default DialogItem