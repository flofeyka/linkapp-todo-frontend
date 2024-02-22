import React, {memo, useState} from 'react'
import styles from './Post.module.css'
import {NavLink} from "react-router-dom";
import AnswerItem from "./PostInterectionsBlock/Answers/AnswerItem";
import AddingNewAnswer from "./PostInterectionsBlock/Answers/AddingNewAnswer/AddingNewAnswer";
import PostInterections from "./PostInterectionsBlock/PostInterections";
import {useDispatch} from "react-redux";
import {acceptCommentChanges, deleteComment} from "../../../../redux/ProfileReducer";
import user from "../../../../assets/Profile/usersProfileIcon.png"

function PostItem({post, ...props}: any) {
    let [answerMode, setAnswerMode] = useState(false);
    let [editMode, setEditMode] = useState(false);
    let [newMessage, setNewMessage] = useState(post.commentMessage);


    const dispatch = useDispatch();

    return <div key={post.id}>
        <div className={styles.logs}>
            <div className={styles.UsersPhotoBlock}>
                <img className={styles.usersPhoto} src={post.usersImage || user} alt={""}/>
            </div>
            <div className={styles.commentDetails}>
                <div className={styles.container}>
                    <div className={styles.name}>
                        <NavLink to={"/user/" + post.userId}>
                            <span className={styles.NameBlock}>{post.fullName}</span>
                        </NavLink>
                        <div className={styles.ChangesBlock}>
                            {props.currentUserId === post.userId ? <div>
                            </div> : null}
                        </div>
                    </div>
                    {editMode && props.currentUserId === post.userId ?
                        <div>
                            <input value={newMessage} autoFocus={true} onChange={(event) => {
                                setNewMessage(event.target.value);
                            }}/>
                            <button onClick={() => {
                                dispatch(acceptCommentChanges({id: post.id, newMessage: newMessage}));
                                setEditMode(false);
                            }}>Применить
                            </button>
                        </div> :
                        <div className={styles.commentMessage}>
                            {post.commentMessage}
                        </div>}
                    <div>
                        <PostInterections setAnswerMode={(answerMode: boolean) => {
                            setAnswerMode(answerMode)
                        }}
                                          answerMode={answerMode} likesCount={post.likesCount} postId={post.id}/>
                    </div>
                </div>

            </div>
            <div className={styles.ChangesBlock}>
                {props.currentUserId === post.userId ? <div>
                    <span>
                        <button onClick={() => {
                            setEditMode(editMode ? false : true)
                        }}>Изменить</button>
                    </span>
                    <span>
                        <button onClick={() => {
                            dispatch(deleteComment(post.id))
                        }}>Удалить</button>
                    </span>
                </div> : null}

            </div>
        </div>
        {post.answers.map((answer: any) => {
            return <AnswerItem setAnswerMode={(editMode: boolean) => setAnswerMode(editMode)} answerMode={answerMode}
                               postId={post.id}
                               answer={answer} currentUserId={props.currentUserId}/>
        })}
        <div>
            {answerMode ?
                <AddingNewAnswer currentUserId={props.currentUserId} currentProfileImage={props.currentProfileImage}
                                 currentFullName={props.currentFullName} postId={post.id}

                /> : null}
        </div>
    </div>
}

export default memo(PostItem);