import React from 'react';
import styles from "./Login.module.css"
import {Navigate, NavLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import {LoginSystem} from "../../../redux/AuthReducer";
import {useFormik} from "formik";
import {RootState, useAppDispatch} from "../../../redux/ReduxStore";

function LoginForm(props: any) {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: ""
        },
        onSubmit: values => {
            dispatch(LoginSystem(values.email, values.password, values.rememberMe, values.captcha));
        }
    });
    console.log(formik.values)

    return <form onSubmit={formik.handleSubmit}>
        <div className={styles.LoginContainer}>
            <div className={styles.InputContainer}>
                <div>
                    {props.error && <div className={styles.formSummaryError}>
                        {props.error}
                    </div>}
                </div>
                <div>
                    <input name={"email"} className={styles.LoginInput} type={"text"}
                           placeholder={"E-mail"} onChange={formik.handleChange}
                           value={formik.values.email}
                    />
                </div>
                <div>
                    <input name={"password"} className={styles.LoginInput} type={"password"}
                           placeholder={"Password"} onChange={formik.handleChange}
                           value={formik.values.password}/>
                </div>
                <div className={styles.checkBoxContainer}>
                    <input name={"rememberMe"} className={styles.checkBoxInput}
                           type={"checkbox"} onChange={formik.handleChange}/>
                    Remember me
                </div>
                <div>
                    {props.captchaUrl != null && <div className={styles.captchaContainer}>
                        <img alt="" src={props.captchaUrl}/>
                        <input name={"captcha"} onChange={formik.handleChange}
                               value={formik.values.captcha}/>
                    </div>
                    }
                    <button>
                        Login
                    </button>
                    <div className={styles.AnAccount}>Do not have an account? <NavLink to={"/register"}>Sign
                        in</NavLink></div>
                </div>
            </div>
        </div>
    </form>
}

function Login() {
    const [isAuth, userId, captchaUrl] = useSelector((state: RootState) => [state.AuthPage.isAuth, state.AuthPage.userId, state.AuthPage.captchaUrl]);


    if (isAuth) return <Navigate to={`/user/${userId}`}/>

    return <div className={styles.LoginBlock}>
        <div className={styles.logIn}>Sign in</div>
        <LoginForm captchaUrl={captchaUrl}/>
    </div>
};

export default Login;