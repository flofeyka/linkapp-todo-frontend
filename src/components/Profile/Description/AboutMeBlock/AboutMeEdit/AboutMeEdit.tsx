import React, { useState } from 'react';
import {editProfile} from '../../../../../redux/ProfileReducer';
import {useAppDispatch} from "../../../../../redux/ReduxStore";
import {contactsType, profileDataType} from "../../../../../types/types";
import {useFormik} from "formik";
import styles from "./aboutMeEdit.module.css";

function ContactsForm({formik, ...props}: any){
    return <span>
        <h4>Другие социальные сети</h4>
        {Object.keys(props.contacts).map((item: any) => {
            return <li key={item}><b>{item}</b>: <input placeholder={item} id={item} name={`contacts.${item}`}
                                                    value={formik.values.contacts[item]}
                                                    onChange={formik.handleChange}/></li>
    })}
    </span>
}

const AboutMeForm = (props: any) => {
    const [editSocialMode, setEditSocialMode] = useState(false) 


    let formik = useFormik({
        initialValues: {
            ...props.profileData,
        },
        onSubmit: values => {
            props.changesSubmit(values)
        }
    });

    console.log(props.profileData.contacts)
    return <form onSubmit={formik.handleSubmit}>
        <h4>Основные данные</h4>
        <li><b>Имя</b>: <input name={"fullName"} id={"fullName"} placeholder={"Имя"}
                                     onChange={formik.handleChange}
                                     value={formik.values.fullName}/></li>
        <li><b>Обо мне</b>: <input name="aboutMe" id={"aboutMe"} placeholder="Обо мне"
                                       onChange={formik.handleChange}
                                       value={formik.values.aboutMe}/></li>
        <h4>Ищу работу: </h4>
        <div>
            <input name={"lookingForAJob"} type={"checkbox"} onChange={formik.handleChange}
                   checked={formik.values.lookingForAJob}/>Я ищу работу
        </div>
        <div>
            <textarea name={"lookingForAJobDescription"} placeholder={"Описание"} onChange={formik.handleChange}
                      value={formik.values.lookingForAJobDescription}/>
        </div>
            {editSocialMode ? <span><ContactsForm formik={formik} contacts={props.contacts}/><button onClick={() => {
                setEditSocialMode(false);
            }}>Свернуть</button></span>
            :<div><h4>Другие социальные сети: <button onClick={() => {setEditSocialMode(true)}}>Развернуть</button></h4></div>}
        <span>
            <button>Принять</button>
        </span>
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
        {props.currentUserId === props.LinkedUserId && !editMode && <button onClick={() => {
            setEditMode(true);
        }}>Редактировать</button>}
    </div>
}

export default AboutMeEdit;