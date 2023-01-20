const authenticate = async () => {
    try{
        const res = await fetch("/logged", {
            method:"GET",
            headers:{
                "Content-Type":"Application/json",
                "Accept": "Application/json"
            },
            credentials:"include",
        });

        const data = await res.json();
        if(data){
            // setUser(data);
            return data;
        }
        if(res.status === 422){
            return;
        }
    }catch(err){
        console.log(err);
        // window.location = "/";
    }
}

export default authenticate;