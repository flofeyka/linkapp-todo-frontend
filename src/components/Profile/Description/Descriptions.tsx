import React, {memo, useState} from "react";
import styles from "./Descriptions.module.css"
import user from "../../../assets/Profile/usersProfileIcon.png"
import {useDispatch} from "react-redux";
import {setStatus, setStatusProfile} from "../../../redux/ProfileReducer";
import FollowBlock from "./FollowBlock/Follow";
import AboutMeBlock from "./AboutMeBlock/AboutMe";
import {contactsType, profileDataType} from "../../../types/types";
import {useAppDispatch} from "../../../redux/ReduxStore";

type Props = {
    currentUsersPhoto: {
        large: string | null
    }
    profileData: profileDataType
    fullName: string
    LinkedUserId: number
    currentUserId: number
    profileStatus: string
    isFollowing: boolean
    followingInProgress: boolean
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    aboutMe: string | null
}

function Descriptions(props: Props) {
    let [editMode, setEditMode] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    return <div className={styles.desc}>
        <div className={styles.Logo}>
            <img src={props.currentUsersPhoto.large || user} alt=""/>
            {props.LinkedUserId != props.currentUserId ? <FollowBlock
                LinkedUserId={props.LinkedUserId} isFollowing={props.isFollowing}
                followingInProgress={props.followingInProgress}/> : null}
        </div>
        <div className={styles.DescriptionContainer}>
            <div className={styles.name}>
                {props.fullName}
            </div>
            <span>
                {!editMode ? <div onDoubleClick={() => {
                    setEditMode(props.LinkedUserId == props.currentUserId)
                }} className={styles.status}>
                    {props.profileStatus}
                </div> : <div>
                    <input className={styles.inputStatus}
                           onChange={(event) => {
                               dispatch(setStatus(event.target.value));
                           }} autoFocus={true} onBlur={() => {
                               setEditMode(editMode = false);
                               dispatch(setStatusProfile(props.profileStatus));
                           }} value={props.profileStatus}>
                    </input>
                </div>}
            </span>
            <span>
                <AboutMeBlock profileData={props.profileData} fullName={props.fullName} LinkedUserId={props.LinkedUserId} contacts={props.contacts}
                              lookingForAJob={props.lookingForAJob}
                              lookingForAJobDescription={props.lookingForAJobDescription} currentUserId={props.currentUserId}
                              aboutMe={props.aboutMe}/>
            </span>
        </div>
    </div>
}

export default memo(Descriptions);