import { useState } from "react";
import { Link } from "react-router-dom";

const UserSearch = () => {
  const [idx, setidx] = useState("");
  const [medicineSearch, setMedicineSearch] = useState("");
  const [singleMed,setSingleMed] = useState({
    name:"",
    quantity:"",
    morning:false,
        afternoon:false,
        evening: false,
        night: false,
  })
  const [MedicinesPres, setMedicinesPres] = useState({
    problem: "",
    diagnosis: "",
    Prescription: [
      {
        name: "",
        quantity: "",
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
      },
    ],
  });
  const [user, setUser] = useState({});

let name,value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSingleMed({...singleMed,[name]:value});
  }

  const postData = async (e) => {
    e.preventDefault();
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
      <div className="m-4">
        <div className="h-16 flex mb-2 flex-row items-center gap-x-4 justify-center bg-gray-100 rounded-lg">
          <h3 className="text-xl">Search with patient's ID</h3>
          <form onSubmit={postData}>
          <input
            type={"text"}
            id="ID"
            name="ID"
            value={idx}
            onChange={(e) => setidx(e.target.value)}
            className="px-2 py-1 rounded-md focus:outline-none"
          />
          </form>
          <i onClick={postData} class="fa-solid fa-magnifying-glass bg-emerald-400 p-2 rounded-lg"></i>
        </div>

        <div className="h-60 flex justify-center items-center border rounded-lg">
          {Object.keys(user).length > 0 ? (
            <>
                <div className="flex">
                    <div>
                        <h1>Name</h1>
                        <h1>{user.fname} {user.lname}</h1>
                    </div>
                    <div>
                        <h1>Age</h1>
                        <h1>{user.age}</h1>
                    </div>
                    <div>
                        <h1>Blood Group</h1>
                        <h1>{user.bgroup}</h1>
                    </div>
                    <div>
                        <h1>Gender</h1>
                        <h1>{user.gender}</h1>
                    </div>
                </div>
            </>
          ) : (
            <Link to="/new-patient" className="p-2 bg-blue-600 my-2 text-white rounded-lg">Create new Patient</Link>
          )}
        </div>
        <div className="flex gap-4 my-4">
          <div className="w-3/5 border rounded-lg px-4">
            <h1 className="text-emerald-700 font-bold text-3xl mt-4 mb-2">
              Prescription
            </h1>
            <div className="text-red-500 font-medium">
              <span>Date: </span>
              <span>{new Date().toLocaleString()}</span>
            </div>

            <div>
              <div className="my-2 flex items-end">
                <span className="mr-6">Problem </span>
                <input
                  className="py-1 px-2 border-b-2 focus:outline-none w-full"
                  type={"text"}
                />
              </div>
              <div className="mb-2 flex items-end">
                <span className="mr-4">Diagnosis </span>
                <input
                  className="py-1 px-2 border-b-2 focus:outline-none w-full"
                  type={"text"}
                />
              </div>
              <div>
                <i className="fa-solid fa-prescription text-4xl mt-4 ml-4"></i>
              </div>
              <div>
                {MedicinesPres.Prescription.map((val, idx) => {
                  return (
                    <>
                      <div>
                        <div>
                          <h1>{val.name}</h1>
                          <h1>{val.quantity}</h1>
                        </div>
                        {val.morning === true ||
                        val.afternoon === true ||
                        val.evening === true ||
                        val.night === true ? (
                          <div>
                            <input type={"checkbox"} value={val.morning} />
                            <input type={"checkbox"} value={val.afternoon} />
                            <input type={"checkbox"} value={val.evening} />
                            <input type={"checkbox"} value={val.night} />
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <button className="w-20 p-2 bg-blue-600 my-2 text-white rounded-lg">
                Send
              </button>
            </div>
          </div>
          <div className="w-2/5 border rounded-lg px-4 pb-2">
            <h1 className="text-2xl text-emerald-700 font-bold my-2">
              Medicines
            </h1>
            <input
              className="border-2 rounded-lg w-full py-1.5 px-2"
              type={"text"} name="medicineSearch" id="medicineSearch" value={medicineSearch} onChange={(e) => setMedicineSearch(e.target.value)}
            />
            <div>
              <h1 className="text-xl text-red-500 font-medium mt-2" onChange={()=> setSingleMed({name:medicineSearch})}>Aspirin</h1>
              <div className="mb-2">
                <div>
                  <h6 className="text-lg font-bold text-emerald-700">
                    Timings
                  </h6>
                  <input className="mr-2" type={"checkbox"} name="morning" id="morning" value={singleMed.morning} onChange={handleInputs}/>
                  <label>Morning</label>
                </div>
                <div>
                  <input className="mr-2" type={"checkbox"} name="afternoon" id="afternoon" value={singleMed.afternoon} onChange={handleInputs}/>
                  <label>Afternoon</label>
                </div>
                <div>
                  <input className="mr-2" type={"checkbox"} name="evening" id="evening" value={singleMed.evening} onChange={handleInputs}/>
                  <label>Evening</label>
                </div>
                <div>
                  <input className="mr-2" type={"checkbox"} name="night" id="night" value={singleMed.night} onChange={handleInputs}/>
                  <label>Night</label>
                </div>
              </div>
              <div>
                <h6 className="text-lg text-emerald-700 font-bold">
                  Before / After
                </h6>
                <input type={"radio"} name="be/af" />
                <label className="mr-4">Before</label>
                <input type={"radio"} name="be/af" />
                <label>After</label>
              </div>
              <button onClick={() => setMedicinesPres({...MedicinesPres})} className="w-20 p-2 bg-blue-600 my-2 text-white rounded-lg">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSearch;
