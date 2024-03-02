import React, { memo, useState } from 'react'
import styles from './Post.module.css'
import { NavLink } from "react-router-dom";
import AnswerItem from "./PostInterectionsBlock/Answers/AnswerItem";
import AddingNewAnswer from "./PostInterectionsBlock/Answers/AddingNewAnswer/AddingNewAnswer";
import PostInterections from "./PostInterectionsBlock/PostInterections";
import { useDispatch } from "react-redux";
import { acceptCommentChanges, deleteComment } from "../../../../redux/ProfileReducer";
import user from "../../../../assets/Profile/usersProfileIcon.png"
import details from "../../../../assets/AdditionalyPhoto.png"
import { useAppDispatch } from '../../../../redux/ReduxStore';


function PostItem({ post, setOpenPost, ...props }: any) {
    const [answerMode, setAnswerMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newMessage, setNewMessage] = useState<string | null>(post.commentMessage);

    return <div key={post.id}>
        <div className={styles.PostBox}>
            <div>
                <img src={post.usersPhoto || user} alt="" className={styles.UsersPhoto} />
            </div>
            <div className={styles.DescriptionBox}>
                <div>
                    <NavLink to={`/user/${post.userId}`}>
                        <div className={styles.UsersName}>
                            {post.fullName}
                        </div>
                    </NavLink>
                    <span className={styles.detailsBlock}>
                        <button className={styles.details}><img src={details} /></button>
                    </span>
                </div>
                <div className={styles.UsersMessage} onClick={() => {
                    setOpenPost(true);
                }}>
                    {post.postMessage}
                </div>
                <PostInterections postId={post.id} likesCount={post.likesCount} answerMode={answerMode} setAnswerMode={(answerMode: boolean) => {
                    setAnswerMode(answerMode)
                }} />
            </div>
        </div>
        <div>
        <div>
            {post.answers.map((answer: any) => {
                return <AnswerItem setAnswerMode={(editMode: boolean) => setAnswerMode(editMode)} answerMode={answerMode}
                    postId={post.id}
                    answer={answer} currentUserId={props.currentUserId} />
            })}
        </div>
        <div>
            {answerMode ?
                <AddingNewAnswer currentUserId={props.currentUserId} currentProfileImage={props.currentProfileImage}
                    currentFullName={props.currentFullName} postId={post.id} /> : null}
        </div>
    </div>
    </div>
}

export default memo(PostItem);