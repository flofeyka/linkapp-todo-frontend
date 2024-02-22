import FriendsReducer, {setFollow, SetUsers, ToggleIsFollowingProgress} from "../FriendsReducer";
import {FriendsType} from "../../types/types";


let state : any = {
    users: [
        {
            id: 1,
            name: "test name 1",
            status: null,
            photos: {
                small: null,
                large: null
            },
            followed: false

        }

    ],
    SearchMessageText: "",
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

it("Users should be set", () => {
    let action = SetUsers([{
            id: 2,
            name: "test name 2",
            status: "test status 1",
            photos: {
                small: null,
                large: null
            },
            followed: false
        },
        {
            id: 3,
            name: "test name 3",
            status: "test status 2",
            photos: {
                small: null,
                large: null
            },
            followed: false
        }]
    );

    let newState = FriendsReducer(state, action);
    expect(newState.users.length).toBe(2);
});

it("User should be followed", () => {
    let action = setFollow({id: 1, isFollowed: true});

    let newState = FriendsReducer(state, action);

    expect(newState.users[0].followed).toBe(true);
});

it("Toggle's count of following progress should be 1", () => {
    let action = ToggleIsFollowingProgress({isFetching: true, userId: 1});

    let newState = FriendsReducer(state, action);

    expect(newState.followingInProgress.length).toBe(1);
});

