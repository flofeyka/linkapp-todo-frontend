import React from "react";
import styles from "./AddingNewAnswer.module.css";
import user from "../../../../../../../assets/Profile/usersProfileIcon.png";
import {answerComment} from "../../../../../../../redux/ProfileReducer";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";

type Props = {
    postId: number
    currentUserId: number
    currentFullName: string
    currentProfileImage: string | null
}

function AddingNewAnswer(props: Props) {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            answerMessage: ""
        },
        validationSchema: Yup.object().shape({
            answerMessage: Yup.string().trim().required()
        }),
        onSubmit: values => {
            dispatch(answerComment({
                id: props.postId, userId: props.currentUserId, name: props.currentFullName,
                image: props.currentProfileImage, message: values.answerMessage, likesCount: 0, isLiked: false
            }));
            values.answerMessage = "";
        }
    })

    return <form className={styles.answerBlock} onSubmit={formik.handleSubmit}>
        <div className={styles.answerBlock}>
            <span>
            <img className={styles.inputAnswerImg}
                 src={props.currentProfileImage || user} alt=""/>
            </span>
            <span>
                <input name={"answerMessage"} className={styles.inputAnswer} autoFocus={true}
                       onChange={formik.handleChange} value={formik.values.answerMessage}/>
            </span>
            <button className={styles.answerButton}>Send</button>
        </div>
    </form>
}

export default AddingNewAnswer;