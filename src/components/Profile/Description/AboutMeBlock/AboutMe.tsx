import styles from "./AboutMe.module.css";
import { FC, useState } from "react";
import closer from "./../../../../assets/Closer.png"
import { NavLink } from "react-router-dom";
import AboutMeEdit from "./AboutMeEdit/AboutMeEdit";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/ReduxStore";



const AboutMeBlock: FC<{LinkedUserId: number}> = ({ LinkedUserId }) => {
    const [fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts,
        currentUserId] = useSelector((state: RootState) => [
            state.ProfilePage.profileData.fullName,
            state.ProfilePage.profileData.aboutMe,
            state.ProfilePage.profileData.lookingForAJob,
            state.ProfilePage.profileData.lookingForAJobDescription,
            state.ProfilePage.profileData.contacts,
            state.AuthPage.userId
        ]);

    const [deploy, setDeploy] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);


    return <div className={styles.AboutMeBlock}>
        <div>
            <button className={styles.aboutMeButton} onClick={() => {
                !deploy ? setDeploy(true) : setDeploy(false);
            }}>Основные данные
            </button>
            {deploy && <div className={styles.aboutMeContainer}>
                <div className={styles.aboutMe}>
                    <div className={styles.closeBlock}>
                        <button className={styles.closeButton} onClick={() => {
                            setDeploy(false);
                            setEditMode(false);
                        }}>
                            <img className={styles.closer} src={closer} alt="" />
                        </button>
                    </div>
                    {!editMode && <div className={styles.Description}>
                        <div>
                            <h3>Основные данные</h3>
                            <li><b>Имя</b>: {fullName}</li>
                            <li><b>Пользовательская ссылка</b>: <NavLink
                                to={`/user/${LinkedUserId}`}>linkapp.com/user/{LinkedUserId}</NavLink></li>
                            <li><b>Уникальный айди</b>: {LinkedUserId}</li>
                            <li><b>Обо мне</b>: <span className={styles.aboutMeText}>{aboutMe}</span></li>
                        </div>
                        {!lookingForAJob || <div>
                            <h3>Я ищу работу.</h3>
                            <li>{lookingForAJobDescription}</li>
                        </div>
                        }
                        <div className={styles.contacts}>
                            {Object.keys(contacts).every(item => !item) && <div className={styles.otherSocial}>
                                <h3>Другие социальные сети</h3>
                                {Object.keys(contacts).map(item => {
                                    if (contacts[item] != null) return <li key={item}><b>{item}</b>: <a
                                        href={"https://" + contacts[item]}>{contacts[item]}</a></li>
                                    return null;
                                })}
                            </div>
                            }
                        </div>
                        {currentUserId === LinkedUserId && <span>
                            <button onClick={() => {
                                setEditMode(true)
                            }}>Редактировать
                            </button>
                        </span>
                        }

                    </div>}
                    {editMode && <AboutMeEdit contacts={contacts} fullName={fullName} aboutMe={aboutMe} lookingForAJob={lookingForAJob} 
                    lookingForAJobDescription={lookingForAJobDescription} currentUserId={currentUserId} LinkedUserId={LinkedUserId}
                        editMode={editMode} setEditMode={(editMode: boolean) => {
                            setEditMode(editMode)
                        }} />}
                </div>
            </div>}
        </div>
    </div>
}

export default AboutMeBlock;