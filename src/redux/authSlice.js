import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        id: null,
        email: null,
        isAuth: false
    }
})

export default authSlice.reducer;