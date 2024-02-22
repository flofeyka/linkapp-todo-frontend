import React from 'react'
import styles from "./SendMsg.module.css"
import SendMessageIcon from "./../../../../assets/SendMessageIcon.png"
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../../../redux/DialogsReducer";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/FormsControl";
import {required} from "../../../../utils/validators/validators";


const SendMessageReduxForm = reduxForm({form: "Dialogs"})((props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={styles.SendContainer}>
            <Field component={Textarea} name={"MessageText"} validate={[required]} className={styles.textmsg}
                   placeholder="Message"/>
            <button className={styles.sender}><img
                src={SendMessageIcon} alt=""/></button>
        </div>
    </form>
})

function SendMessageArea() {
    const [userId, fullName, usersPhoto] = useSelector(state => [state.AuthPage.userId, state.AuthPage.login, state.AuthPage.currentProfileImage.small])
    const dispatch = useDispatch()

    function sendMessageSubmit(values) {
        dispatch(sendMessage(userId, fullName, usersPhoto, values.MessageText));
    }

    return <div>
        <SendMessageReduxForm onSubmit={sendMessageSubmit}/>
    </div>
}

export default SendMessageArea;