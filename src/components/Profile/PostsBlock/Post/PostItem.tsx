import React, { FC, memo, useState } from 'react'
import styles from './Post.module.css'
import { NavLink } from "react-router-dom";
import AnswerItem from "./PostInterectionsBlock/Answers/AnswerItem";
import AddingNewAnswer from "./PostInterectionsBlock/Answers/AddingNewAnswer/AddingNewAnswer";
import PostInterections from "./PostInterectionsBlock/PostInterections";
import { useDispatch } from "react-redux";
import { acceptCommentChanges, deleteComment } from "../../../../redux/ProfileReducer";
import user from "../../../../assets/Profile/usersProfileIcon.png"
import details from "../../../../assets/AdditionalyPhoto.png"
import { RootState, useAppDispatch } from '../../../../redux/ReduxStore';
import { useSelector } from 'react-redux';
import { answersType, postItemType } from '../../../../types/types';


type Props = {
    post: postItemType
    setOpenPost: any
    openPost: boolean
}

const PostItem: FC<Props> = ({ post, setOpenPost, openPost }) => {
    const currentUserId = useSelector((state: RootState) => state.AuthPage.userId);

    const [answerMode, setAnswerMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newMessage, setNewMessage] = useState<string>(post.postMessage);

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
                {post.answers.map((answer: answersType) => {
                    return <AnswerItem currentUserId={currentUserId} setAnswerMode={(editMode: boolean) => setAnswerMode(editMode)} answerMode={answerMode}
                        postId={post.id} answer={answer} />
                })}
            </div>
            <div>
                {answerMode && <AddingNewAnswer postId={post.id} />}
            </div>
        </div>
    </div>
}

export default memo(PostItem);