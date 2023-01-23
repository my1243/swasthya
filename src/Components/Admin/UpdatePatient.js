import { useState } from "react";

const UpdatePatient = () => {
    const [user, setUser] = useState({});
    const [pid, setPID] = useState("");
    const searchPat = async (e) => {
        e.preventDefault();
        const idx = pid;
        const res = await fetch("/searchUser", {
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({idx})
        });
        const data = await res.json();
        if(res.status === 422 || !data){
            console.log("Invalid details");
        }else{
            setUser(data);
        }
      }
    return (
      <>
        <div className="mx-4 mt-4 w-full">
          <div>
            <h1 className="text-4xl font-semibold my-2">Update patient details...</h1>
            <div className="h-2 bg-neutral-800 rounded-full w-[36rem]"></div>
          </div>
          <div>
            <form className="my-4">
              <div className="mb-4 flex flex-col w-full sm:flex-row items-start justify-center h-16 sm:items-center border rounded-2xl">
                <h1 className="text-xl font-medium text-red-500">Search for patient</h1>
                <input type={"text"} className="p-2 mx-4 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear" id="pid" name="pid" value={pid} onChange={(e) => setPID(e.target.value)}/>
                <button onClick={searchPat}><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>
              {Object.keys(user).length > 0 ? 
              <>
              {/* <div className="h-0.5 bg-gray-700 mb-4"></div> */}
              <div className="mb-4 flex flex-col w-full sm:flex-row items-start sm:items-center">
                <div className="w-1/3 text-lg">Name</div>
                <div className="flex flex-row w-full sm:w-2/3">
                  <input
                    className="p-2 w-full sm:w-2/3 mr-4 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                    type={"text"}
                    name="fname"
                    id="fname"
                    value={user.fname}
                    placeholder="First Name"
                  />
                  <input
                    className=" p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                    type={"text"}
                    name="lname"
                    id="lname"
                    value={user.lname}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
                <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                  Email Address
                </label>
                <input
                  className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  type={"email"}
                  name="email"
                  id="email"
                  value={user.email}
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
                <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                  Contact No
                </label>
                <input
                  className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  type={"text"}
                  name="phone"
                  id="phone"
                  value={user.mobile}
                  placeholder="Mobile No"
                />
              </div>
              <div className="mb-4 flex flex-col items-start sm:flex-row sm:items-center">
                <label className="text-lg w-full sm:w-1/3 mb-0.5 sm:mb-0">
                  Address
                </label>
                <textarea
                  className="p-2 w-full sm:w-2/3 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear"
                  name="address"
                  id="address"
                  value={user.address}
                  placeholder="Address"
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="w-1/3 bg-black text-white font-bold uppercase py-2 px-6 rounded-lg hover:bg-red-500 hover:text-black"
                  type="submit"
                >
                  Update
                </button>
              </div>
              </> : <></>
              }
            </form>
          </div>
        </div>
      </>
    );
  };
  
export default UpdatePatient;