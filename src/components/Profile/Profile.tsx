import React, { memo } from "react";
import styles from "./Profile.module.css";
import Descriptions from "./Description/Descriptions";
import Posts from "./PostsBlock/Posts";
import { useParams } from "react-router-dom";

function Profile() {
    let LinkedUserId:any = useParams().userId;

    return <div className={styles.content}>
        <div>
            <Descriptions LinkedUserId={+LinkedUserId} />
        </div>
        <div className={styles.postsBlock}>
            <Posts />
        </div>

    </div>
};

export default memo(Profile);