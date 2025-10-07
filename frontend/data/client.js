import instance from "./axios";

export async function getClient() {
    try{
        const response = await instance.get("/client");
        return response.data;
    }catch(error){
        console.log(error)
    }
}

export async function createClient(clientData) {
    try{
        const response = await instance.post("/client", clientData);
        return response.data
    }catch(error){
        console.log(error)
    }
}

export async function clientId(id){
    try{
        const response = await instance.get("/client/" + id);
        return response.data
    } catch(error){
        console.log(error)
    }
}

export async function putClient(id){
    try{
        const response = await instance.put("/client/"+id);
        return response.data
    } catch (error){
        console.log(error)
    }
}

export async function deleteClient(id){
    try{
        const response = await instance.delete("/client/"+id);
        return response.data
    } catch(error){
        console.log(error)
    }
}
