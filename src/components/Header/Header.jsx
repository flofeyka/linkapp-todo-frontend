import React from "react";
import "../../App.css"
import styles from "./Header.module.css";
import logo from "../../assets/logo.png"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LogOutSystem} from "../../redux/AuthReducer";

function Header() {
    const [isAuth, login, userId] = useSelector(state => [
        state.AuthPage.isAuth,
        state.AuthPage.login,
        state.AuthPage.userId
    ]);
    const dispatch = useDispatch();

    return <header className={styles.header}>
        <NavLink to={"/"}>
            <span className={styles.linkapp}>
                <img src={logo} alt="logo" className={styles.logo}/><span className={styles.linkApp}>LinkApp</span>
                </span>
        </NavLink>
            <span className={styles.loginBlock}>{isAuth &&
                <NavLink to={"/user/" + userId}>
                    <span className={styles.UserBlock}>
                        <span className={styles.LoginText}>
                            {login}
                        </span>
                        <NavLink to={"auth"}><button onClick={() => {
                            dispatch(LogOutSystem());
                        }}>Log Out</button></NavLink>
                    </span>
                </NavLink>}
            </span>
        </header>
}


export default Header;