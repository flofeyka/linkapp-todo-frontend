import React from 'react';
import styles from "./Login.module.css"
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { LoginSystem } from "../../../redux/AuthReducer";
import { useFormik } from "formik";
import { RootState, useAppDispatch } from "../../../redux/ReduxStore";
import * as Yup from "yup";
import { Button, Checkbox } from '@mui/material';

const Login: React.FC = () => {
    const [isAuth, captchaUrl] = useSelector((state: any) => [state.AuthPage.isAuth, state.AuthPage.captchaUrl]);

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: values => {
            dispatch(LoginSystem(values.email, values.password, values.rememberMe, values.captcha));
        }
    });


    if (isAuth) return <Navigate to={`/feed`} />

    return <form onSubmit={formik.handleSubmit}>
        <div className={styles.LoginBlock}>
            <div className={styles.logIn}>Вход</div>
            <div className={styles.LoginContainer}>
                <div className={styles.InputContainer}>
                    <div>
                        {formik.errors.email &&
                            <label className={styles.formSummaryError} htmlFor="email">Неправильный логин или пароль</label>
                        }
                        <input name={"email"} className={styles.LoginInput}
                            placeholder={"E-mail"} onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <input name={"password"} className={styles.LoginInput} type={"password"}
                            placeholder={"Password"} onChange={formik.handleChange}
                            value={formik.values.password} />
                    </div>
                    <div className={styles.checkBoxContainer}>
                        <Checkbox name={"rememberMe"} className={styles.checkBoxInput} onChange={formik.handleChange} />
                        Запомнить вход
                    </div>
                    <div>
                        {captchaUrl && <div className={styles.captchaContainer}>
                            <img alt="" src={captchaUrl} />
                            <input name={"captcha"} onChange={formik.handleChange}
                                value={formik.values.captcha} />
                        </div>
                        }
                        <Button variant="contained" type="submit">
                            Войти
                        </Button>
                        <div className={styles.AnAccount}>Нет аккаунта? <Link to={"/register"}>Зарегистрироваться</Link></div>
                    </div>
                </div>
            </div>
        </div>

    </form>
};

export default Login;