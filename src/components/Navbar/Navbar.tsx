import React, {useEffect} from 'react';
import '../../App.css'
import styles from "./Nav.module.css"
import {NavLink} from 'react-router-dom'
import user from "../../assets/Profile/usersProfileIcon.png"
import feed from "../../assets/Navbar/feed.png"
import messanger from "../../assets/Navbar/messenger.png"
import music from "../../assets/Navbar/music.png"
import video from "../../assets/Navbar/video.png"
import settings from "../../assets/Navbar/setting.png"
import friends from "../../assets/Navbar/friends.png"
import community from "../../assets/Navbar/community.png"
import {useSelector} from "react-redux";
import {getCurrentLogo} from "../../redux/AuthReducer";
import {RootState, useAppDispatch} from "../../redux/ReduxStore";

function Navbar() {
    const [usersPhoto, fullName, userId] = useSelector((state: RootState) => [
        state.AuthPage.currentProfileImage.small,
        state.AuthPage.login,
        state.AuthPage.userId
    ]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentLogo());
    }, [usersPhoto, dispatch]);

    return <nav className={styles.Nav}>
        <NavLink to={"/user/" + userId}>
            <button className={styles.ProfileBlock}>
                <span>
                    <img src={usersPhoto || user} alt=""/>
                </span>
                <span className={styles.profileBlock}>{fullName}</span>
            </button>
        </NavLink>
        <NavLink to="/feed">
            <button className={styles.NavButton}><img src={feed} alt="Feed"/>
                Новости
            </button>
        </NavLink>
        <NavLink to="/dialogs">
            <button className={styles.NavButton} type='submit'><img
                src={messanger} alt="Messanger"/>
                Мессенджер
            </button>
        </NavLink>
        <NavLink to="/community">
            <button className={styles.NavButton} type='submit'><img src={community} alt="Community"/>
                Сообщества
            </button>
        </NavLink>
        <NavLink to="/music">
            <button className={styles.NavButton}><img className="Music"
                         src={music} alt="Music"/>
                Музыка
            </button>
        </NavLink>
        <NavLink to="/videos">
            <button className={styles.NavButton}><img
                src={video} alt="Video"/>
                Видео
            </button>
        </NavLink>
        <NavLink to={"/Friends"}>
            <button className={styles.NavButton}>
                <img src={friends} alt="Friends"/>
                Друзья
            </button>
        </NavLink>
        <NavLink to="/settings">
            <button className={styles.NavButton}><img
                src={settings} alt="Settings"/>
                Настройки
            </button>
        </NavLink>
    </nav>
};

export default Navbar;