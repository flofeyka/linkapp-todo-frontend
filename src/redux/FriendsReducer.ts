import {UsersAPI} from "../API/api";
import {friendsItemType, FriendsType} from "../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
        }
    }, extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action: any) => {
            state.isFetching = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.totalUsersCount = action.payload.totalCount
            state.isFetching = false;
        })
        builder.addCase(Follow.pending, (state, action) => {
            state.followingInProgress.push(action.payload)
        })
        builder.addCase(Follow.fulfilled, (state, action) => {
            state.users.forEach((user: friendsItemType) => {
                if (action.payload === user.id) user.followed = true
            })
            state.followingInProgress.splice(state.followingInProgress.indexOf(action.payload), 1)
        })
        builder.addCase(unFollow.pending, (state, action) => {
            state.followingInProgress.push(action.payload)
        })
        builder.addCase(unFollow.fulfilled, (state, action) => {
            state.users.forEach((user: friendsItemType) => {
                if (action.payload === user.id) user.followed = false
            })
            state.followingInProgress.splice(state.followingInProgress.indexOf(action.payload), 1)
        })
    }
});

export const {setFollow, SetUsers, setCurrentPage, setUsersTotalCount, ToggleIsFetching, ToggleIsFollowingProgress} = friendsSlice.actions;

export const getUsers = createAsyncThunk('friends/getUsers', async (currentPage: number) => {
    let Response = await UsersAPI.getUsers(currentPage, 52);
    let {items, totalCount} = Response.data;
    return {items, totalCount};
})

export const Follow = createAsyncThunk("/users/follow", async (userId: number) => {
    let Response = await UsersAPI.follow(userId);
    return Response.data.id;
});

export const unFollow = createAsyncThunk("/users/unfollow", async (userId: number) => {
    let Response = await UsersAPI.unfollow(userId)
    return Response.data.id;
}) 


export default friendsSlice.reducer;