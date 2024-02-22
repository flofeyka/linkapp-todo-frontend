import React from 'react'
import styles from './AddNewPost.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addPost} from "../../../../redux/ProfileReducer";
import {addPostFeed} from "../../../../redux/FeedReducer";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/FormsControl";
import {RootState} from "../../../../redux/ReduxStore";


const PostItemReduxForm = reduxForm({form: "PostMessage"})(function NewFeedPostForm(props) {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name={"NewPostMessage"} className={styles.NewPost}
                   placeholder='Write something new...'/>
        </div>
        <div>
            <button className={styles.addNewPost}>
                Post
            </button>
        </div>
    </form>
})

function AddNewPost() {
    const [userId, usersPhoto, fullName] = useSelector((state: RootState) => [
        state.AuthPage.userId,
        state.AuthPage.currentProfileImage.large,
        state.AuthPage.login]);
    const dispatch = useDispatch();

    const onAddPost = (values: any) => {
        dispatch(addPost({userId: userId, fullName: fullName, currentProfileImage: usersPhoto,
            NewPostMessage: values.NewPostMessage, likesCount: 0, isLiked: false}));
        dispatch(addPostFeed({fullName: fullName, usersPhoto: usersPhoto, postText: values.NewPostMessage, userId: userId}));
    }

    return <div>
        <div>
            <PostItemReduxForm onSubmit={onAddPost}/>
        </div>
    </div>
}

export default AddNewPost;