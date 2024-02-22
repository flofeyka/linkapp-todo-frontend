import React from 'react';
import {editProfile} from '../../../../../redux/ProfileReducer';
import {useAppDispatch} from "../../../../../redux/ReduxStore";
import {contactsType, profileDataType} from "../../../../../types/types";
import {useFormik} from "formik";
import styles from "./aboutMeEdit.module.css"

const AboutMeForm = (props: any) => {
    let formik = useFormik({
        initialValues: {
            ...props.profileData,
            ...props.contacts
        },
        onSubmit: values => {
            props.changesSubmit(values)
        }
    });

    console.log(props.profileData.contacts)
    return <form onSubmit={formik.handleSubmit}>
        <h4>Основные данные</h4>
        <li><b>Full Name</b>: <input name={"fullName"} id={"fullName"} placeholder={"Имя"}
                                     onChange={formik.handleChange}
                                     value={formik.values.fullName}/></li>
        <li><b>About me</b>: <textarea name="aboutMe" id={"aboutMe"} placeholder="Обо мне"
                                       onChange={formik.handleChange}
                                       value={formik.values.aboutMe}/></li>
        <h4>Ищу работу: </h4>
        <li>
            <input name={"lookingForAJob"} type={"checkbox"} onChange={formik.handleChange}
                   checked={formik.values.lookingForAJob}/>Я ищу работу
        </li>
        <div>
            <textarea name={"lookingForAJobDescription"} placeholder={"Описание"} onChange={formik.handleChange}
                      value={formik.values.lookingForAJobDescription}/>
        </div>

        <h4>Other social</h4>
        {Object.keys(props.contacts).map((item: any) => {
            return <li key={item}><b>{item}</b>: <input placeholder={item} id={item} name={`contacts.${item}`}
                                                        value={formik.values.contacts[item]}
                                                        onChange={formik.handleChange}/></li>
        })}
        <div>
            <button>Принять</button>
        </div>
    </form>
}

type Props = {
    editMode: boolean
    setEditMode: any
    currentUserId: number
    LinkedUserId: number
    profileData: profileDataType
}

function AboutMeEdit({editMode, setEditMode, profileData, ...props}: Props) {
    const dispatch = useAppDispatch();

    function changesSubmit(values: any) {
        dispatch(editProfile(values));
        setEditMode(false);
    }

    return <div className={styles.beforeAboutMeContainer}>
        {editMode && <div>
            <AboutMeForm profileData={profileData} changesSubmit={changesSubmit} contacts={profileData.contacts}/>
        </div>}
        {props.currentUserId == props.LinkedUserId && !editMode && <button onClick={() => {
            setEditMode(true);
        }}>Edit</button>}
    </div>
}

export default AboutMeEdit;