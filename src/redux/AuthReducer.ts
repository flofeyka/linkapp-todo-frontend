import {AuthAPI, ProfileAPI, SecurityAPI} from "../API/api";
import {authType} from "../types/types";
import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        login: null,
        email: null,
        isAuth: false,
        currentProfileImage: {
            small: null,
            large: null
        },
        isFetching: false,
        captchaUrl: null,
        currentUserName: null
    } as authType,
    reducers: {
        setUserData: (state, action) => {
            [state.userId, state.login, state.email] = [action.payload.id, action.payload.login, action.payload.email];
        },
        setLoginStatus: (state, action) => {
            state.isAuth = action.payload
        },
        RegisterConfirm: (state, action) => {

        },
        setCurrentPhoto: (state, action) => {
            state.currentProfileImage = action.payload
        },
        setCaptchaUrl: (state, action) => {
            state.captchaUrl = action.payload
        }
    }
});

export const {setUserData, setLoginStatus, RegisterConfirm, setCurrentPhoto, setCaptchaUrl} = authSlice.actions;

export const getUserData = () => async (dispatch: any) => {
    const data = await AuthAPI.getUsersData();
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setUserData({id, login, email}));
        dispatch(setLoginStatus(true))
    }
}

export const getCurrentLogo = () => async (dispatch: any, getState: any) => {
    let userId = getState().AuthPage.userId;
    let data = await ProfileAPI.getUserProfile(userId);
    dispatch(setCurrentPhoto(data.photos));
}

export const LoginSystem = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: any) => {
    const data = await AuthAPI.Login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        await dispatch(setLoginStatus(true));
        await dispatch(getUserData());
    } else if (data.resultCode === 10) {
        await dispatch(getCaptchaUrl());
    }
};

export const setCaptcha = (url: string | null) => ({type: setCaptchaUrl, url})

export const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await SecurityAPI.getCaptcha();
    const captchaUrl = data.url;

    dispatch(setCaptcha(captchaUrl));
}

export const LogOutSystem = () => async (dispatch: any) => {
    let data = await AuthAPI.LogOut();
    if (data.resultCode === 0) {
        dispatch(setLoginStatus(false));
    }
};

export const setNewCurrentUsersPhoto = (photo: any) => async (dispatch: any) => {
    let data = await AuthAPI.setCurrentPhoto(photo);
    if (data.resultCode === 0) dispatch(setCurrentPhoto(data.photos));
}
export default authSlice.reducer;