import {ProfileAPI, UsersAPI} from "../API/api";
import {postItemType, profileDataType, profileType} from "../types/types";
import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData: {
            photos: {
                large: null,
                small: null
            }
        } as profileDataType,
        currentUserId: null,
        isFetching: true,
        PostItem: [] as Array<postItemType>,
        status: null,
        isFollowing: null,
        followingInProgress: null
    } as profileType,
    reducers: {
        addPost: (state, action) => {
            let {userId, fullName, currentProfileImage, NewPostMessage, likesCount, isLiked} = action.payload
            state.PostItem.push({
                id: state.PostItem.length + 1,
                userId: userId,
                fullName: fullName,
                usersImage: currentProfileImage,
                commentMessage: NewPostMessage,
                likesCount: likesCount,
                isLiked: isLiked,
                answers: []
            })
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setUserProfile: (state, action) => {
            state.profileData = action.payload
        },
        answerComment: (state, action) => {
            let {id, name, image, userId, message, isLiked, likesCount} = action.payload
            state.PostItem.forEach(post => {
                if (post.id === id) {
                    post.answers.push({
                        id: post.answers.length + 1,
                        postId: id,
                        answerName: name,
                        usersImage: image,
                        userId: userId,
                        answerMessage: message,
                        isLiked: isLiked,
                        likesCount: likesCount
                    });
                }
                ;
            });
        },
        setLikeAnswer: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.forEach(answer => {
                    if (answer.id === action.payload.answerId && post.id === action.payload.postId) {
                        answer.likesCount = !answer.isLiked ? answer.likesCount + 1 : answer.likesCount - 1;
                        answer.isLiked = !answer.isLiked;
                    }
                    ;
                });
            });
        },
        setFollow: (state, action) => {
            state.isFollowing = action.payload
        },
        ToggleIsFollowingProgress: (state, action) => {
            state.followingInProgress = action.payload
        },
        setLike: (state, action) => {
            state.PostItem.forEach(post => {
                if (post.id === action.payload) {
                    post.likesCount = !post.isLiked ? post.likesCount + 1 : post.likesCount - 1;
                    post.isLiked = !post.isLiked;
                }
            });
        },
        acceptCommentChanges: (state, action) => {
            state.PostItem.forEach(post => {
                post.commentMessage = post.id === action.payload.id ? action.payload.newMessage : post.commentMessage;
            });
        },
        deleteComment: (state, action) => {
            state.PostItem.splice(action.payload - 1, 1);
        },
        acceptAnswerChanges: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.forEach(answer => {
                    answer.answerMessage = answer.id === action.payload.answerId && post.id === action.payload.postId
                        ? action.payload.newMessage : answer.answerMessage;
                })
            })
        },
        deleteAnswer: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.splice(action.payload - 1, 1);
            });
        }
    }
});

export const {
    addPost, setStatus, setUserProfile, answerComment, setLikeAnswer, setFollow, ToggleIsFollowingProgress,
    setLike, acceptCommentChanges, deleteComment, acceptAnswerChanges, deleteAnswer
} = profileSlice.actions;

export const getStatus = (userId: number) => async (dispatch: any) => {
    let Response = await ProfileAPI.getProfileStatus(userId);
    dispatch(setStatus(Response.data));
    if(Response.data == null) {
        dispatch(setStatus("Статус отсутствует :)"))
    }
}

export const getProfile = (userId: any) => async (dispatch: any) => {
    const Response = await ProfileAPI.getUserProfile(userId);
    dispatch(setUserProfile(Response.data));
    dispatch(getStatus(userId));
    dispatch(getFollowingData(userId));
}

export const setStatusProfile = (status: string) => async (dispatch: any) => {
    const Response = await ProfileAPI.setProfileStatus(status);
    if (Response.data.resultCode === 0) dispatch(setStatus(status));
}

export const getFollowingData = (userId: number) => async (dispatch: any) => {
    let Response = await ProfileAPI.getFollowingData(userId);
    dispatch(setFollow(Response.data));
}

export const Follow = (id: number) => async (dispatch: any) => {
    dispatch(ToggleIsFollowingProgress(true));
    let Response = await UsersAPI.follow(id);
    if (Response.data.resultCode === 0) dispatch(setFollow(true));
    dispatch(ToggleIsFollowingProgress(false));
}

export const unFollow = (id: number) => async (dispatch: any) => {
    dispatch(ToggleIsFollowingProgress(true));
    let Response = await UsersAPI.unfollow(id);
    if (Response.data.resultCode === 0) dispatch(setFollow(false));
    dispatch(ToggleIsFollowingProgress(false));
}

export const editProfile = (data: object) => async (dispatch: any, getState: any) => {
    const userId = getState().AuthPage.userId;
    let Response = await ProfileAPI.editProfileData(data);
    if (Response.data.resultCode === 0) dispatch(getProfile(userId));
}


export default profileSlice.reducer;