import React from 'react';
import styles from "./Auth.module.css";
import {NavLink} from 'react-router-dom';

function Auth() {
    return <div className={styles.auth}>
        <div className={styles.AuthText}>
            Авторизация
        </div>
        <div className={styles.buttonBlock}>
            <div>
                <NavLink to="/login">
                    <button>Авторизоваться</button>
                </NavLink>
            </div>
            <div>
                <NavLink to="/register">
                    <button>Зарегистрироваться</button>
                </NavLink>
            </div>
        </div>
    </div>
};

export default Auth;