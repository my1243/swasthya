import client from "./client"

export const prescribe = async (object) => {
    try{
        const data = await client.post('/prescribe',object);
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
        const data = await client.post('/searchUser',object);
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
        const data = await client.get('/dlogged',{withCredentials:true});
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
        const data = await client.post('/doctlogin',object);
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
        const data = await client.get('/logout',{withCredentials:true});
        return data.data;
    }catch(err){
        const {response} = err;
        if(response?.data){
            return response.data;
        }
        return {err:err.message || err};
    }
}