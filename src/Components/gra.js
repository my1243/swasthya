import { useEffect } from "react";

const { useState } = require("react")

const Gra = () => {
    const [data,setData] = useState({});
    const geData = async () => {
        const dat = await fetch("http://localhost:8000/graphql", {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const res = await dat.json();
        console.log(res.data);
        if(res){
            setData(res?.data);
            console.log(data)
        }
    }
    useEffect(() => {
        geData();
    },[]);
    return(
        <h1>{data?.hello}</h1>
    )
}

export default Gra;