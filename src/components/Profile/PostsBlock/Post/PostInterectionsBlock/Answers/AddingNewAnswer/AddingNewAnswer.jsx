import React from "react";
import styles from "./AddingNewAnswer.module.css";
import user from "../../../../../../../assets/Profile/usersProfileIcon.png";
import {answerComment} from "../../../../../../../redux/ProfileReducer";
import {useDispatch} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../../../common/FormsControl/FormsControl";
import {required} from "../../../../../../../utils/validators/validators";

const AddingNewAnswerReduxForm = reduxForm({form: "answer"})(function(props) {
    return <form onSubmit={props.handleSubmit}>
        <div className={styles.answerBlock}>
            <span>
            <img className={styles.inputAnswerImg}
                 src={props.currentProfileImage || user} alt=""/>
            </span>
            <span>
                <Field component={Input} validate={[required]} name={"answerMessage"} className={styles.inputAnswer} autoFocus={true}/>
            </span>
            {/*НЕ ИСПРАВЛЕНА ПРОБЛЕМА С ДУБЛИКАЦИЕЙ ЗНАЧЕНИЙ VALUE INPUT*/}
            <button className={styles.answerButton}>Send</button>
        </div>
    </form>
})

function AddingNewAnswer(props) {
    const dispatch = useDispatch();

    function handleSubmit(values) {
        dispatch(answerComment({id: props.postId, userId: props.currentUserId, name: props.currentFullName,
            image: props.currentProfileImage, message: values.answerMessage, likesCount: 0, isLiked: false}));
    }

    return <div className={styles.answerBlock}>
        <AddingNewAnswerReduxForm onSubmit={handleSubmit} currentProfileImage={props.currentProfileImage}/>
    </div>
}

export default AddingNewAnswer;