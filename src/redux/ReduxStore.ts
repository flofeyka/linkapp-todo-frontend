import {reducer as formReducer} from "redux-form"
import DialogsReducer from "./DialogsReducer";
import ProfileReducer from "./ProfileReducer";
import FriendsReducer from "./FriendsReducer";
import FeedReducer from "./FeedReducer";
import AuthReducer from "./AuthReducer";
import CommunityReducer from "./CommunityReducer";
import appSlice from "./AppReducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        MsgPage: DialogsReducer,
        ProfilePage: ProfileReducer,
        FeedPage: FeedReducer,
        FriendsPage: FriendsReducer,
        AuthPage: AuthReducer,
        CommunityPage: CommunityReducer,
        App: appSlice,
        form: formReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


export default store;