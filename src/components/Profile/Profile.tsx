import React, { memo, useEffect } from "react";
import styles from "./Profile.module.css";
import Descriptions from "./Description/Descriptions";
import Posts from "./PostsBlock/Posts";
import { useSelector } from "react-redux";
import { getFollowingData, getProfile, getStatus } from "../../redux/ProfileReducer";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/ReduxStore";

function Profile() {
    const [profileData, currentUsersPhoto, PostItem, isFollowing, currentUserId, followingInProgress,
        profileStatus, currentProfileImage, currentFullName] = useSelector((state: any) => [
            state.ProfilePage.profileData,
            state.ProfilePage.profileData.photos,
            state.ProfilePage.PostItem,
            state.ProfilePage.isFollowing,
            state.AuthPage.userId,
            state.ProfilePage.followingInProgress,
            state.ProfilePage.status,
            state.AuthPage.currentProfileImage,
            state.AuthPage.login
        ]);

    const dispatch: any = useAppDispatch();

    let LinkedUserId: any = useParams().userId;
    useEffect(() => {
        dispatch(getProfile(LinkedUserId));
        dispatch(getFollowingData(LinkedUserId));
        dispatch(getStatus(LinkedUserId));
    }, [LinkedUserId, dispatch]);


    return <div className={styles.content}>
        <Descriptions profileData={profileData} currentUsersPhoto={currentUsersPhoto} fullName={profileData.fullName} isFollowing={isFollowing}
            LinkedUserId={+LinkedUserId} currentUserId={currentUserId}
            followingInProgress={followingInProgress} profileStatus={profileStatus}
            contacts={profileData.contacts}
            lookingForAJobDescription={profileData.lookingForAJobDescription}
            lookingForAJob={profileData.lookingForAJob} aboutMe={profileData.aboutMe} />
        <div className={styles.postsBlock}>
            <Posts PostItem={PostItem} currentFullName={currentFullName}
                currentUserId={currentUserId} currentProfileImage={currentProfileImage} />
        </div>

    </div>
};

export default memo(Profile);