import {doctor, patient} from "./client";

export const prescribe = async (object) => {
    try{
        const data = await doctor.post('/prescribe',object);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data) {
            return response.data;
        }
        return {err: err.message || err};
    }
};

export const searchUser = async (object) => {
    try{
        const data = await patient.post('/searchUser',object);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err:err.message || err};
    }
}

export const doctor_authentication = async () => {
    try{
        const data = await doctor.get('/dlogged');
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err: err.message || err};
    }
}

export const dlogin = async (object) => {
    try{
        const data = await doctor.post('/doctlogin',object);
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err: err.message || err};
    }
}

export const dlogout = async () => {
    try{
        const data = await doctor.get('/logout');
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err:err.message || err};
    }
}