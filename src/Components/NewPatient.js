import { useEffect, useState } from "react";

const NewPatient = () => {    
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

    return (
    <>
      <div className=" relative container flex items-center justify-center overflow-hidden">
      {/* <div className=" absolute rotate-45 -top-40 left-0 rounded-2xl h-80 w-96 bg-blue-900"></div> */}
        {/* <div className="absolute rotate-45 -bottom-32 -right-2 rounded-2xl h-96 w-96 bg-orange-500"></div> */}
        <div className="z-50 flex bg-emerald-300 justify-center items-center">
          <div className="w-3/5 h-[40rem]">
            <img className="object-cover object-center" src="images/signup.png" />
          </div>
          <div className="w-2/5 mx-6 mr-12">
            <div className="z-40 h-full bg-emerald-200 rounded-xl shadow-2xl shadow-slate-300 p-4 ">
              <h1 className="text-center text-emerald-700 text-2xl font-bold uppercase flex justify-center flex-col items-center">
                Sign Up
                <hr className="border-emerald-700 border-2 bg-emerald-700 rounded-lg mt-1 w-6" />
              </h1>
              <p className="text-center">Create a new account and join with us. It's completely free</p>
              <form className="mt-6">
                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="enter your name"
                />
                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="email id"
                />
                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"password"}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="password"
                />
                <div>
                <input
                  className="w-full mb-4 outline-none border border-emerald-500 p-2 rounded-lg"
                  type={"text"}
                  id="mobile"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleInputs}
                  placeholder="moible no"
                />
                {/* <input type={"choice"}/> */}
                <select value={"B+ve"}/>
                <select value={"B+ve"}/>
                <select value={"B+ve"}/>
                <select value={"B+ve"}/>
                <select value={"B+ve"}/>
                </div>
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
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default NewPatient;