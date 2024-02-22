import React from 'react';
import AddNewPost from './AddNewPost/AddNewPost';
import user from "../../../assets/Profile/usersProfileIcon.png"
import styles from "./Posts.module.css"
import {NavLink} from "react-router-dom";
import {FeedPostItemType} from "../../../types/types";

type Props = {
    FeedPosts: any
}

function Posts(props: Props) {
    return (<div>
        <div>
            <AddNewPost/>
        </div>
        <div className={styles.PostContainer}>
            {props.FeedPosts.map((p: FeedPostItemType) => {
                return (<div className={styles.PostBox}>
                            <div>
                                <img src={p.usersPhoto || user} alt="" className={styles.UsersPhoto}/>
                            </div>
                            <div className={styles.DescriptionBox}>
                                <div>
                                    <NavLink to={`/user/${p.userId}`}>
                                        <div className={styles.UsersName}>
                                            {p.fullName}
                                            <span>
                                                <button className={styles.details}>...</button>
                                            </span>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className={styles.UsersMessage}>
                                    {p.postMessage}
                                </div>
                            </div>
                </div>)
            })
            }
        </div>
    </div>)
}

export default Posts;