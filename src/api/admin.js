import { admin, doctor, patient } from "./client"

export const alogin = async (object) => {
    try{
        const data = await admin.post("/adminlog", object);
        console.log(data);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err: err.response || err};
    }
}

export const newPatient = async (object) => {
    try{
        const data = await patient.post("/patSignup",object);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err:err.response || err};
    }
}

export const admin_authentication = async () => {
    try{
        const data = await admin.get('/alogged');
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err: err.message || err};
    }
}

export const newDoctor = async (object) => {
    try{
        const data = await doctor.post("/doctSignup",object);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err:err.response || err};
    }
}

export const updatePatient = async (object) => {
    try{
        const data = await patient.post("/updatePatient",object);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err:err.response || err};
    }
}

export const getAllAppointments = async (object) => {
    try{
        const data = await admin.post("/getAppointments",object);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err:err.response || err};
    }
}

export const bookAppointment = async (object) => {
    try{
        const data = await patient.post("/bookapp",object);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err:err.response || err};
    }
}