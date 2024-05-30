import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/api";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        id: null,
        email: null,
        isAuth: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(action.payload.user) {
                const {id, email} = action.payload.user;
                state.id = id;
                state.email = email;
                state.isAuth = true;
            }
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if(action.payload.user) {
                const {id, email} = action.payload.user;
                state.id = id;
                state.email = email;
                state.isAuth = true;
            }
        });
        builder.addCase(getUsersData.fulfilled, (state, action) => {
            if(action.payload.user) {
                const {id, email} = action.payload.user;
                state.id = id;
                state.email = email;
                state.isAuth = true;
            }
        })

    }
});

export const login = createAsyncThunk("/auth/login", async (payload) => {
    const data = await authAPI.signIn(payload);
    return data;
});

export const register = createAsyncThunk("/auth/register", async (payload) => {
    const data = await authAPI.signUp(payload);
    return data;
});

export const getUsersData = createAsyncThunk("/auth/getUsersData", async () => {
    const data = await authAPI.getUsersData();
    return data;
})

export default authSlice.reducer;