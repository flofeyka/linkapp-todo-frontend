import React from 'react';
import styles from "./Register.module.css";
import {NavLink} from 'react-router-dom';
import {Field, reduxForm} from "redux-form";
import {useDispatch} from "react-redux";
import {Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators/validators";
import {RegisterConfirm} from "../../../redux/AuthReducer";

const RegisterReduxForm = reduxForm({form: "register"})((props) => {
    return <form onSubmit={props.RegisterSubmit}>
        <div className={styles.RegisterContainer}>
            <div>
                <Field component={Input} name={"email"} type="email" placeholder='Электронная почта'
                       validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={"login"} type="text" placeholder='Логин'
                       validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={"password"} type="password" placeholder='Пароль'
                       validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={"repeatPassword"} type="password" placeholder='Повторите пароль'
                       validate={[required]}/>
            </div>
            <div>
                <button>Зарегистрироваться</button>
            </div>
            <div className={styles.AnAccount}>Уже есть аккаунт? <NavLink to="/login">Авторизоваться</NavLink></div>
        </div>
    </form>
})

function Register(props) {
    const dispatch = useDispatch();

    function RegisterSubmit(values) {
        if (values.password === values.repeatPassword) {
            dispatch(RegisterConfirm(values.email, values.login, values.password, values.repeatPassword));
        };
    }

    return <div className={styles.RegisterBlock}>
            <div className={styles.SignIn}>Sign up</div>
            <RegisterReduxForm RegisterSubmit={RegisterSubmit}/>
        </div>
};

export default Register;