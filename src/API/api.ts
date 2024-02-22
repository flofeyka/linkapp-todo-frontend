import axios from "axios";

const instance = axios.create({
    withCredentials: true, baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`);
    }, unfollow(id : number) {
        return instance.delete(`follow/${id}`);
    }, follow: (id : number) => {
        return instance.post(`follow/${id}`, {});
    }
};

export const ProfileAPI = {
    getUserProfile(userId : any) {
        return instance.get(`profile/${userId}`);
    }, getProfileStatus(userId : any) {
        return instance.get(`profile/status/${userId}`);
    }, setProfileStatus(status : any) {
        return instance.put("profile/status", {status});
    }, getFollowingData(userId : any) {
        return instance.get(`follow/${userId}`);
    }, editProfileData(data : object) {
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
