import instance from "./axios";

export async function getService() {
    try{
        const response = await instance.get("/service");
        return response.data;
    }catch(error){
        console.log(error)
    }
}

export async function createService() {
    try{
        const response = await instance.post("/service");
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

export async function putService(id){
    try{
        const response = await instance.put("/service/"+id);
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
