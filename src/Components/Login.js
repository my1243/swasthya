import { useContext, useEffect, useState } from "react";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    validateCaptcha,
} from "react-simple-captcha";
import { UserContext } from "../App";
import { dlogin } from "../api/doctor";
const Login = (props) => {
    // const {state,dispatch} = useContext(UserContext);
    useEffect(() => {
        loadCaptchaEnginge(6, "#d1d5db", "red");
    },[]);
    
    const [user,setUser] = useState({
        email:"",
        password:"",
        captcha:""
    });
    
    let name,value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    
    const submit_form = async (e) => {
        e.preventDefault();
        if (validateCaptcha(user.captcha, false) == true) {
            // alert("Captcha Matched");
            try{
                const {email, password} = user;
                
                const data = await dlogin({email,password});
                if(data?.success){
                    console.log(data);
                    window.location = "/user-search";
                }else{
                    console.log("error");
                }
            }catch(err){
                console.log(err);
            }
        } else {
            alert("Captcha Does Not Match");
            loadCaptchaEnginge(6, "#d1d5db", "red");
        }
    };

    return (
    <>
      <div className=" relative container h-[88.9vh] flex items-center justify-center overflow-hidden">
      <div className=" absolute rotate-45 -top-40 left-0 rounded-2xl h-80 w-96 bg-blue-900"></div>
        <div className="absolute rotate-45 -bottom-32 -right-2 rounded-2xl h-96 w-96 bg-orange-500"></div>
        <div className="z-50 flex bg-emerald-300 justify-center items-center rounded-3xl">
          <div className="w-3/5">
            <img src="images/doctor.png" />
          </div>
          <div className="w-2/5 mx-6 mr-12">
            <div className="z-40 h-full bg-emerald-200 rounded-xl shadow-2xl shadow-slate-300 p-4 w-96 mx-6">
              <h1 className="text-center text-emerald-700 text-2xl font-bold uppercase flex justify-center flex-col items-center">
                Sign In
                <hr className="border-emerald-700 border-2 bg-emerald-700 rounded-lg mt-1 w-6" />
              </h1>
              <form className="mt-6">
                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="email id"
                />
                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"password"}
                  id="password"
                  name="password"
                  autoComplete="password"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="password"
                />
                <LoadCanvasTemplate />
                <input
                  className="w-full my-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="captcha"
                  name="captcha"
                  value={user.captcha}
                  onChange={handleInputs}
                  placeholder="Captcha"
                />
              </form>
              <button
                className="p-2 w-full mb-4 text-center bg-[#e64b09] hover:bg-emerald-400 text-white font-medium rounded-md transition-colors duration-300 ease-linear mt-4"
                onClick={submit_form}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;