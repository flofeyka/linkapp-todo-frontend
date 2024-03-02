import React from 'react'
import styles from './AddNewPost.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../../redux/ProfileReducer";
import { addPostFeed } from "../../../../redux/FeedReducer";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../../common/FormsControl/FormsControl";
import { RootState, useAppDispatch } from "../../../../redux/ReduxStore";
import { useFormik } from 'formik';
import * as Yup from "yup";

function AddNewPost() {
    const [userId, usersPhoto, fullName] = useSelector((state: RootState) => [
        state.AuthPage.userId,
        state.AuthPage.currentProfileImage.large,
        state.AuthPage.login]);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            NewPostMessage: ""
        },
        validationSchema: Yup.object().shape({
            NewPostMessage: Yup.string().trim().required()
        }),
        onSubmit: (values: any) => {
            dispatch(addPost({
                userId: userId, fullName: fullName, currentProfileImage: usersPhoto,
                NewPostMessage: values.NewPostMessage, likesCount: 0, isLiked: false
            }));
            dispatch(addPostFeed({ fullName: fullName, usersPhoto: usersPhoto, postText: values.NewPostMessage, userId: userId }));
        }
    })



    return <form onSubmit={formik.handleSubmit}>
        <div className={styles.NewPostBlock}>
            <span>
                <textarea name={"NewPostMessage"} className={styles.NewPost}
                    placeholder='Что у вас нового?' value={formik.values.NewPostMessage} onChange={formik.handleChange}/>
            </span>
            <span>
                <button className={styles.addNewPost}>
                    Отправить
                </button>
            </span>
        </div>
    </form>
}

export default AddNewPost;