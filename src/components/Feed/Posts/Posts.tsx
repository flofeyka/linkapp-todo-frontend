import React, { useState } from 'react';
import AddNewPost from './AddNewPost/AddNewPost';
import styles from "./Posts.module.css"
import { FeedPostItemType } from "../../../types/types";
import OpenPostBlock from './PostItem/OpenPost/OpenPostBlock';
import PostItem from './PostItem/PostItem';

type Props = {
    FeedPosts: any
}

function Posts(props: Props) {
    debugger;
    const [openPost, setOpenPost] = useState<boolean>(false);
    return (<div>
        <div>
            <AddNewPost />
        </div>
        {openPost && <OpenPostBlock setOpenPost={(openMode: boolean) => {
            setOpenPost(openMode)
        }} />}
        <div className={styles.PostContainer}>
            {props.FeedPosts.map((post: FeedPostItemType) => {
                return <PostItem post={post} setOpenPost={(openPost: boolean) => {setOpenPost(openPost)}}/>
            })
            }
        </div>
    </div>)
}

export default Posts;