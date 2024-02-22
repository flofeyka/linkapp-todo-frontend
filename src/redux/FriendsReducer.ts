import {UsersAPI} from "../API/api";
import {friendsItemType, FriendsType} from "../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        users: [] as Array<friendsItemType>,
        SearchMessageText: "",
        pageSize: 52,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>
    } as FriendsType,
    reducers: {
        setFollow: (state, action) => {
            state.users.forEach((user: any) => {
                if(user.id === action.payload.id) {
                    user.followed = action.payload.isFollowed;
                }
            });
        },
        SetUsers: (state, action: PayloadAction<Array<friendsItemType>>) => {
            state.users = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setUsersTotalCount: (state, action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },
        ToggleIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        ToggleIsFollowingProgress: (state, action: PayloadAction<any>) => {
            action.payload.isFetching ? state.followingInProgress.push(action.payload.userId) :
            state.followingInProgress.splice(state.followingInProgress.indexOf(action.payload.id), 1)
        }
    }
});

export const {setFollow, SetUsers, setCurrentPage, setUsersTotalCount, ToggleIsFetching, ToggleIsFollowingProgress} = friendsSlice.actions;

export const getUsers = (currentPage: number, pageSize: number = 50) => async (dispatch: any) => {
    dispatch(ToggleIsFetching(true))
    let Response = await UsersAPI.getUsers(currentPage, pageSize)
    dispatch(ToggleIsFetching(false))
    dispatch(SetUsers(Response.data.items))
    dispatch(setUsersTotalCount(Response.data.totalCount))
}

export const Follow = (id: number) => async (dispatch: any) => {
    dispatch(ToggleIsFollowingProgress({isFetching: true, userId: id}))
    let Response = await UsersAPI.follow(id)
    if (Response.data.resultCode === 0) dispatch(setFollow({id, isFollowed: true}))
    dispatch(ToggleIsFollowingProgress({isFetching: false, userId: id}))
}

export const unFollow = (id: number) => async (dispatch: any) => {
    dispatch(ToggleIsFollowingProgress({isFetching: true, id}))
    let Response = await UsersAPI.unfollow(id)
    if (Response.data.resultCode === 0) dispatch(setFollow({id, isFollowed: false}));
    dispatch(ToggleIsFollowingProgress({isFetching: false, id}));
}


export default friendsSlice.reducer;