import axios from "axios";

const doctor = axios.create({
    baseURL:"http://localhost:8000/api/v2/doctor",
    withCredentials:true,
})

const admin = axios.create({
    baseURL:"http://localhost:8000/api/v2/admin",
    withCredentials:true,
})

const patient = axios.create({
    baseURL:"http://localhost:8000/api/v2/patient",
    withCredentials:true,
})

export {doctor, admin, patient};