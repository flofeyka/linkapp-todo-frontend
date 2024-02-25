import React from 'react';
import styles from "./NewPost.module.css";
import {addPost} from "../../../../../redux/ProfileReducer";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../../../redux/ReduxStore";
import * as Yup from "yup";


function AddingNewPost(props: any) {
    const dispatch = useAppDispatch();

    let formik = useFormik({
        initialValues: {
            NewPostMessage: ""
        },
        validationSchema: Yup.object().shape({
            NewPostMessage: Yup.string().trim().required()
        }),
        onSubmit: values => {
            dispatch(addPost({
                userId: props.currentUserId, fullName: props.currentFullName,
                currentProfileImage: props.currentProfileImage, NewPostMessage: values.NewPostMessage,
                likesCount: 0, isLiked: false
            }));
        }
    });


    return <form onSubmit={formik.handleSubmit}>
        <div>
            <input name={"NewPostMessage"} className={styles.newpost} placeholder={"Что у вас нового?"}
                   onChange={formik.handleChange}
                   value={formik.values.NewPostMessage}/>
        </div>
        <div>
            <button className={styles.posting}>Отправить</button>
        </div>
    </form>
}

export default AddingNewPost;