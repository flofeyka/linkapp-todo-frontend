import React from "react";
import styles from "./FollowBlock.module.css"
import {Follow, unFollow} from "../../../../redux/ProfileReducer";
import {useAppDispatch} from "../../../../redux/ReduxStore";


type Props = {
    LinkedUserId: number
    isFollowing: boolean
    followingInProgress: boolean
}
function FollowBlock(props: Props) {
    const dispatch = useAppDispatch();
    return <div className={styles.followBlock}>
        {!props.isFollowing ? <button onClick={() => {
            dispatch(Follow(props.LinkedUserId))
        }} disabled={props.followingInProgress}>Подписаться
        </button> :
            <button onClick={() => {
                dispatch(unFollow(props.LinkedUserId))
            }} disabled={props.followingInProgress}>Отписаться
            </button>}
    </div>
}

export default FollowBlock;