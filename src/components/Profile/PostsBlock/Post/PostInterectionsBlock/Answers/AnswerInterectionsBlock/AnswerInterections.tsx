import styles from "./AnswerInterections.module.css";
import {setLikeAnswer} from "../../../../../../../redux/ProfileReducer";
import React from "react";
import {useDispatch} from "react-redux";

type Props = {
    answerId: number
    postId: number
    likesCount: number
    answerMode: boolean
    setAnswerMode: any
}

function AnswerInterections(props: Props) {
    const dispatch = useDispatch();
    return <div className={styles.answerInterectionsBlock}>
        <span>
            <button onClick={() => {
                dispatch(setLikeAnswer({answerId: props.answerId, postId: props.postId}));
            }}>Лайк {props.likesCount}</button>
        </span>
        <span>
            <button onClick={() => {
                !props.answerMode ? props.setAnswerMode(true) : props.setAnswerMode(false)
            }}>Ответить</button>
        </span>
        <span>
            <button>Поделиться</button>
        </span>
    </div>
}

export default AnswerInterections;