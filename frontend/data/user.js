import { login } from "../../backend/controllers/user"
import instance from "./axios"

export async function login() {
    try{
    const response = await instance.post("/login");
    return response.data;
    } catch(error){
        console.log(error)
    }
}