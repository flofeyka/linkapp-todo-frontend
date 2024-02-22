import React, {useEffect} from "react"
import styles from "./Feed.module.css"
import Posts from "./Posts/Posts";
import {useSelector} from "react-redux";
import {setCurrentPhoto} from "../../redux/AuthReducer";
import {RootState, useAppDispatch} from "../../redux/ReduxStore";

function Feed() {
    const [FeedPosts, userId] = useSelector((state: RootState) => [state.FeedPage.FeedPosts, state.AuthPage.userId]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCurrentPhoto(userId));
    }, [userId]);

    return (
        <div className={styles.feed}>
            <Posts FeedPosts={FeedPosts}
            />
        </div>
    )
}

export default Feed;
