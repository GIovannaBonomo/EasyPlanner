import instance from "./axios";

export async function getService() {
    const token = localStorage.getItem("token");
    if(!token) return;
    try{
        const response = await instance.get("/service");
        return response.data;
    }catch(error){
        console.log(error)
    }
}

export async function createService(serviceData) {
    try{
        const response = await instance.post("/service", serviceData);
        return response.data
    }catch(error){
        console.log(error)
    }
}

export async function serviceId(id){
    try{
        const response = await instance.get("/service/" + id);
        return response.data
    } catch(error){
        console.log(error)
    }
}

export async function putService(id, serviceData){
    try{
        const response = await instance.put("/service/"+id, serviceData);
        return response.data
    } catch (error){
        console.log(error)
    }
}

export async function deleteService(id){
    try{
        const response = await instance.delete("/service/"+id);
        return response.data
    } catch(error){
        console.log(error)
    }
}
