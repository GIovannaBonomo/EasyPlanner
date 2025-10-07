import instance from "./axios";

export async function getAppointment() {
    try{
        const response = await instance.get("/appointments");
        return response.data;
    }catch(error){
        console.log(error)
    }
}

export async function createAppointment() {
    try{
        const response = await instance.post("/appointments");
        return response.data
    }catch(error){
        console.log(error)
    }
}

export async function AppointmentId(id){
    try{
        const response = await instance.get("/appointments/"+ id );
        return response.data
    } catch(error){
        console.log(error)
    }
}

export async function putAppointment(id){
    try{
        const response = await instance.put("/appointments/"+id);
        return response.data
    } catch (error){
        console.log(error)
    }
}

export async function deleteAppointment(id){
    try{
        const response = await instance.delete("/appointments/"+id);
        return response.data
    } catch(error){
        console.log(error)
    }
}
