import axios from "axios";
import { profileDataType } from "../types/types";

const instance = axios.create({
    withCredentials: true, baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const followAPI = {
    unfollow(id : number) {
        return instance.delete(`follow/${id}`);
    }, follow: (id : number) => {
        return instance.post(`follow/${id}`, {});
    }
}

export const UsersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = "") {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
        .then(res => res.data);
    },
};

export const ProfileAPI = {
    getUserProfile(userId : number) {
        return instance.get(`profile/${userId}`);
    }, getProfileStatus(userId : number) {
        return instance.get(`profile/status/${userId}`);
    }, setProfileStatus(status : string | null) {
        return instance.put("profile/status", {status});
    }, getFollowingData(userId : number) {
        return instance.get(`follow/${userId}`);
    }, editProfileData(data : profileDataType) {
        return instance.put("profile", data);
    }
};

export const AuthAPI = {
    getUsersData() {
        return instance.get("auth/me");
    }, Login(email : string, password : string , rememberMe : boolean = false, captcha : string | null = null) {
        return instance.post("auth/login", {email, password, rememberMe, captcha})
    }, LogOut() {
        return instance.delete("auth/login");
    }, setCurrentPhoto(photo: File) {
        let formData = new FormData();
        formData.append("image", photo)
        return instance.put("profile/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
};

export const SecurityAPI = {
    getCaptcha() {
        return instance.get("security/get-captcha-url")
    }
}
