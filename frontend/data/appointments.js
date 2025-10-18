import instance from "./axios";

export async function getAppointment() {
    try{
        const response = await instance.get("/appointment");
        return response.data;
    }catch(error){
        console.log(error)
    }
}

export async function createAppointment(appointmentData) {
    try{
        const response = await instance.post("/appointment", appointmentData);
        return response.data
    }catch(error){
        console.error("Errore in createAppointment:", error);
        throw error;      
    }
}

export async function AppointmentId(id){
    try{
        const response = await instance.get("/appointment/"+ id );
        return response.data
    } catch(error){
        console.log(error)
    }
}

export async function putAppointment(id, appointmentData){
    try{
        const response = await instance.put("/appointment/"+id, appointmentData);
        return response.data
    } catch (error){
        console.log(error)
    }
}

export async function deleteAppointment(id){
    try{
        const response = await instance.delete("/appointment/"+id);
        return response.data
    } catch(error){
        console.log(error)
    }
}
