import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/"
})

export const authAPI = {
    async signIn(payload) {
        const Response = await axios.post("http://localhost:5000/auth/login", {...payload});
        localStorage.setItem("token", Response.data.accessToken);
        return Response.data;
    },

    async signUp(email, password) {
        const Response = await axios.post("http://localhost:5000/auth/register", {email, password});
        localStorage.setItem("token", Response.data.accessToken);
        return Response.data;
    },

    async getUsersData() {
        const Response = await axios.get("http://localhost:5000/auth/refresh", {
            withCredentials: true
        });
        localStorage.setItem("token", Response.data.accessToken);
        return Response.data;
    }
}

export const tasksAPI = {
    async addTask(name, isPinned = false, taskMessage) {
        const Response = await instance.post("http://localhost:5000/tasks/addTask", {name, isPinned, taskMessage}, {withCredentials: true, headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }})
        return Response.data;
    },

    async getTasks() {
        const Response = await instance.get("tasks/get", {headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
            }})
        return Response.data;
    },

    async deleteTask(id) {
        const Response = await instance.delete(`tasks/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        return Response.data;
    },

    async editTask(id, taskMessage) {
        const Response = await instance.put("tasks/edit", {
          id, taskMessage
        }, {headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
            }});
        return Response.data;
    },

    async pinTask(id) {
        const Response = await instance.post(`tasks/pin/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        return Response.data;
    },

    async unPinTask(id) {
        const Response = await instance.delete(`tasks/unpin/${id}`, {headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }});

        return Response.data;
    }
}