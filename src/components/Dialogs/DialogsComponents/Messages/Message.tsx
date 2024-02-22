import React from "react";
import styles from "./Messages.module.css"
import usersPhoto from "./../../../../assets/Profile/usersProfileIcon.png"
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/ReduxStore";


type Props = {
    id: number
    currentUserId: number
    usersPhoto: string
    name: string
    message: string
}

function Message(props: Props) {
    let userId = useSelector((state: RootState) => state.AuthPage.userId)
    return (
        <div>
            <div className={userId === props.currentUserId ? styles.usersMessageBlock : styles.MessagesBlock}>
                <img className={styles.usersPhoto} alt="" src={props.usersPhoto || usersPhoto}/>
                <span className={styles.usersName}>
                    {props.name}
                </span>
                <div className={userId === props.currentUserId ? styles.usersMessageBlockItem : styles.messageItem}>{props.message}</div>
            </div>
        </div>
    )
}

export default Message;