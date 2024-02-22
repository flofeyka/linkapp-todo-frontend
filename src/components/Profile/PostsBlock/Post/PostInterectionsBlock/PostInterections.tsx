import React from 'react';
import styles from "./PostInterections.module.css";
import {setLike} from "../../../../../redux/ProfileReducer";
import {useAppDispatch} from "../../../../../redux/ReduxStore";

type Props = {
    postId: number
    likesCount: number
    answerMode: boolean
    setAnswerMode: any
}

function PostInterections(props: Props) {
    const dispatch = useAppDispatch();

    return <div className={styles.interectionsBlock}>
        <span>
            <span>
                <button className={styles.isLikedButton} onClick={() => {
                    dispatch(setLike(props.postId))
                }}>Лайк {props.likesCount}</button>
            </span>
        </span>
        <span>
            <button onClick={() => {
                props.setAnswerMode(!props.answerMode ? true : false)
            }}>Ответить</button>
        </span>
        <span>
            <button>Поделиться</button>
        </span>
    </div>
}

export default PostInterections;