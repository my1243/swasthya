import React, { useState } from "react";
import { alogin } from "../../api/admin";

const SignIn = (props) => {
    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const postData = async (e) => {
        e.preventDefault();
        try{
            const {email, password} = user;
           

            const data = await alogin({email,password});
            if(data?.success){
                window.location = "/connect-admin/home";
            }else{
                console.log("err");
                // props.isadminlog(true);
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <>
      <div className="max-w-screen min-h-screen flex items-center justify-center">
        <div className="max-w-[1000px] m-auto p-4 border-2 rounded-lg">
          <h1 className="font-bold text-xl uppercase">Sign In</h1>
          <h3 className="text-slate-600 font-semibold mb-4">
            Kindly sign in with your details to get started
          </h3>
          <form className="flex flex-col justify-center">
            <input
              className="max-w-full my-2 p-2 bg-gray-200 rounded-lg placeholder-slate-900"
              type={"text"}
              name={"email"}
              id={"email"}
                value={user.email}
                autoComplete="off"
              placeholder="Email Address"
              onChange={(e) => setUser({...user,email:e.target.value})}
            />
            <input
              className="max-w-full my-2 p-2 bg-gray-200 rounded-lg placeholder-slate-900"
              type={"password"}
              name={"password"}
              id={"password"}
              autoComplete="off"
              value={user.password}
              placeholder="Password"
              onChange={(e) => setUser({...user,password:e.target.value})}
            />
            <a className="max-w-full text-right mb-4 underline" href="#">
              Forgot Password?
            </a>
            <button
              className="bg-zinc-900 text-white p-2 text-xl rounded-lg"
              type={"submit"} onClick={postData}
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
