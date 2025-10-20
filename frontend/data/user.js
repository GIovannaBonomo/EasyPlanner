import { login } from "../../backend/controllers/user"
import instance from "./axios"

export async function login() {
    try {
        const response = await instance.post("/user/login");
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function register(formData) {
    try {
        const response = await instance.post("/user/register", formData);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
