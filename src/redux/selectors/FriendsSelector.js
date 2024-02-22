export function getAllUsers(state) {
    return state.FriendsPage.users;
}

export function getTotalUsersCount(state) {
    return state.FriendsPage.totalUsersCount;
}

export function getPageSize(state) {
    return state.FriendsPage.pageSize;
}

export function getProgressInFollowing(state) {
    return state.FriendsPage.followingInProgress;
}

export function getCurrentPage(state) {
    return state.FriendsPage.currentPage;
}

