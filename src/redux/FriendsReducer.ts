import { followAPI, UsersAPI } from "../API/api";
import { friendsItemType, FriendsType } from "../types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        setCurrentPage: (state, action: PayloadAction<number>) => {
            return { ...state, currentPage: action.payload }
        },
        ToggleIsFetching: (state, action: PayloadAction<boolean>) => {
            return { ...state, isFetching: action.payload }
        }
    }, extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action: PayloadAction) => {
            return { ...state, isFetching: true }
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            return {
                ...state, users: action.payload.items,
                totalUsersCount: action.payload.totalCount,
                isFetching: false
            }
        })
        builder.addCase(Follow.pending, (state, action: PayloadAction) => {
            return {
                ...state, followingInProgress: [...state.followingInProgress, action.payload]
            }
        })
        builder.addCase(Follow.fulfilled, (state, action: PayloadAction<number>) => {
            return {
                ...state, users: [...state.users.map(user => {
                    if (user.id === action.payload) {
                        return { ...user, followed: true }
                    }
                    return user;
                })]
            }
        })
        builder.addCase(Follow.rejected, (state, action) => {
            return { ...state, followingInProgress: { ...state.followingInProgress.filter(id => id != action.payload) } }
        });
        builder.addCase(unFollow.pending, (state, action) => {
            return {
                ...state, followingInProgress: [...state.followingInProgress, action.payload]
            }
        })
        builder.addCase(unFollow.fulfilled, (state, action) => {
            return {
                ...state, users: [...state.users.map(user => {
                    if (user.id === action.payload) {
                        return { ...user, followed: true }
                    }
                    return user;
                })]
            }
        })
        builder.addCase(unFollow.rejected, (state, action) => {
            return { ...state, followingInProgress: { ...state.followingInProgress.filter(id => id != action.payload) } }
        });
    }
});

export const { setCurrentPage, ToggleIsFetching } = friendsSlice.actions;

export const getUsers = createAsyncThunk('friends/getUsers', async (currentPage: number, term) => {
    const data = await UsersAPI.getUsers(currentPage, 52, term);
    const { items, totalCount } = data;
    return { items, totalCount };
})

export const Follow = createAsyncThunk("/users/follow", async (userId: number) => {
    const data = await followAPI.follow(userId);
    return data.id;
});

export const unFollow = createAsyncThunk("/users/unfollow", async (userId: number) => {
    const data = await followAPI.unfollow(userId)
    return data.id;
})


export default friendsSlice.reducer;