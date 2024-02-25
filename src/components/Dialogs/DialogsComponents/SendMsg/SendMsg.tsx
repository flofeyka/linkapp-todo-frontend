import React from 'react'
import styles from "./SendMsg.module.css"
import SendMessageIcon from "./../../../../assets/SendMessageIcon.png"
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../../../redux/DialogsReducer";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/FormsControl";
import {RootState} from "../../../../redux/ReduxStore";


const SendMessageReduxForm = reduxForm({form: "Dialogs"})((props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={styles.SendContainer}>
            <Field component={Textarea} name={"MessageText"} className={styles.textmsg}
                   placeholder="Message"/>
            <button className={styles.sender}><img
                src={SendMessageIcon} alt=""/></button>
        </div>
    </form>
})

function SendMessageArea() {
    const [userId, fullName, usersPhoto] = useSelector((state: RootState) => [state.AuthPage.userId, state.AuthPage.login, state.AuthPage.currentProfileImage.small])
    const dispatch = useDispatch()

    function sendMessageSubmit(values: any) {
        dispatch(sendMessage(userId, fullName, usersPhoto, values.MessageText));
    }

    return <div>
        <SendMessageReduxForm onSubmit={sendMessageSubmit}/>
    </div>
}

export default SendMessageArea;