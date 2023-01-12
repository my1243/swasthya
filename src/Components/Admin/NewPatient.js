import { useEffect, useState } from "react";

const NewPatient = () => {    
    const [user,setUser] = useState({
        fname:"",
        lname:"",
        email:"",
        password:"",
        cpassword:"",
        mobile:"",
        bgroup:"",
        address:"",
        gender:"M",
        age:""
    });
    
    let name,value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        const password = e.password;
        const cpassword = e.cpassword;
        if(password === cpassword){
            const {fname,lname,email,password,mobile,bgroup,address,gender,age} = user;
            const res = await fetch("/patSignup", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    fname, lname, email, password, mobile, bgroup, address, gender, age
                })
            });
            const data = await res.json();
            if(res.status === 422 || !data){
                console.log("Invalid Data");

            }  else{
                console.log("data stored successfully");
            }
        }else{
            window.alert("password and confirm password does not match!!!");
        }
    }

    return (
    <>
      <div className="w-full">
      {/* <div className=" absolute rotate-45 -top-40 left-0 rounded-2xl h-80 w-96 bg-blue-900"></div> */}
        {/* <div className="absolute rotate-45 -bottom-32 -right-2 rounded-2xl h-96 w-96 bg-orange-500"></div> */}
        <div className="flex bg-emerald-300 justify-center items-center">
          <div className="w-3/5">
            <img className="h-[50%]" src="./../images/signup.png" />
          </div>
          <div className="w-2/5 mx-6 mr-12">
            <div className="h-full bg-emerald-200 rounded-xl shadow-2xl shadow-slate-300 p-4 ">
              <h1 className="text-center text-emerald-700 text-2xl font-bold uppercase flex justify-center flex-col items-center">
                Sign Up
                <hr className="border-emerald-700 border-2 bg-emerald-700 rounded-lg mt-1 w-6" />
              </h1>
              <p className="text-center">Create a new account and join with us. It's completely free</p>
              <form className="mt-6">
              <div className="flex gap-x-4">
                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="fname"
                  name="fname"
                  value={user.fname}
                  onChange={handleInputs}
                  placeholder="first name"
                />

                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="lname"
                  name="lname"
                  value={user.lname}
                  onChange={handleInputs}
                  placeholder="last name"
                />
              </div>
                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="email id"
                />
                <div className="flex gap-x-4 mb-4">
                <input
                  className="w-full outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="mobile"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleInputs}
                  placeholder="mobile no"
                />
                <input
                  className="w-full outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="bgroup"
                  name="bgroup"
                  value={user.bgroup}
                  onChange={handleInputs}
                  placeholder="blood group"
                />
                <input
                  className="w-full outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"Number"}
                  id="age"
                  name="age"
                  value={user.age}
                  onChange={handleInputs}
                  placeholder="1"
                />
                
                </div>
                <textarea className="w-full rounded-lg focus:outline-none border-emerald-500 p-2" placeholder="Address" name="address" id="address" value={user.address} onChange={handleInputs}/>
                <div>
                    <input type={"radio"} name="gender" id="gender" value={"M"} onChange={handleInputs}></input>
                    <label className="ml-1 mr-4">Male</label>
                    <input type={"radio"} name="gender" id="gender" value={"F"} onChange={handleInputs}></input>
                    <label className="ml-1">Female</label>
                </div>
              <button
              onClick={postData}
                className="p-2 w-full mb-4 text-center bg-[#e64b09] hover:bg-emerald-400 text-white font-medium rounded-md transition-colors duration-300 ease-linear mt-4"
              >
                Create Account!
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default NewPatient;