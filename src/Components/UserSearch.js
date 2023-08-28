import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doctor_authentication, prescribe, searchUser } from "../api/doctor";

const UserSearch = (props) => {
  const [idx, setidx] = useState("");
  const authenticate = async () => {
    try{
        const data = await doctor_authentication();
        console.log(data);
        if(data?.success){
            props.setDoct(data.data);
        }else{
            throw new Error("can't authnticate");
        }
    }catch(err){
        // setFlag(false);
        console.log(err);
        window.location = "/login";
    }
}

  const [medicineSearch, setMedicineSearch] = useState("");
  const [singleMed, setSingleMed] = useState({
    name: "",
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
    beaf: 0,
    quantity: 0,
  });
  const [MedicinesPres, setMedicinesPres] = useState({
    date:new Date().toLocaleDateString(),
    problem: "",
    diagnosis: "",
    Medicines: [],
    no_of_days: 0
  });
  const [user, setUser] = useState({});

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMedicinesPres({ ...MedicinesPres, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const data = await searchUser({idx});
    if (data?.success) {
        setUser(data.data);
    } else {
        setUser({});
        console.log(data.error);
    }
  };

  useEffect(() => {
    authenticate();
  },[]);

  const presData = async (e) => {
    e.preventDefault();
    const {PID,fname,lname} = user; 
    if(window.confirm("Confirm the medicines added!") === false){
        return;
    }
    const data = await prescribe({PID,fname,lname,prescription:MedicinesPres});
    if(data?.success){
        console.log(data);
        setMedicinesPres({});
        setUser({});
        setSingleMed({});
        setidx("");
    }else{
        console.log("err");
    }
  } 
  return (
    <>
      <div className="m-4">
        <div className="h-16 flex mb-2 flex-row items-center gap-x-4 justify-center bg-gray-100 rounded-lg">
          <h3 className="text-xl">Search with patient's ID</h3>
          <div className="rounded-md overflow-hidden flex">
            <form onSubmit={postData}>
            <input
              type={"text"}
              id="ID"
              name="ID"
              value={idx}
              onChange={(e) => setidx(e.target.value)}
              className="px-2 py-1 focus:outline-none"
            />
            </form>
          <i
            onClick={postData}
            class="fa-solid fa-magnifying-glass bg-sky-200 hover:bg-sky-400 p-2"
          ></i>
          </div>
        </div>

        {Object.keys(user).length > 0 ? (
          <>
            <div className="border rounded-lg p-4">
              <h1 className="text-2xl text-sky-400 font-bold mb-2">
                Patient details
              </h1>
              <div className="flex items-center justify-between ">
                <div className="flex gap-x-2">
                  <h1 className="text-lg font-semibold">Name:</h1>
                  <h1 className="text-lg text-red-500 font-medium">
                    {user.fname} {user.lname}
                  </h1>
                </div>
                <div className="flex gap-x-2">
                  <h1 className="text-lg font-semibold">Age:</h1>
                  <h1 className="text-lg text-red-500 font-medium">
                    {user.age}
                  </h1>
                </div>
                <div className="flex gap-x-2">
                  <h1 className="text-lg font-semibold">Blood Group:</h1>
                  <h1 className="text-lg text-red-500 font-medium">
                    {user.bgroup}
                  </h1>
                </div>
                <div className="flex gap-x-2">
                  <h1 className="text-lg font-semibold">Gender:</h1>
                  <h1 className="text-lg text-red-500 font-medium">
                    {user.gender}
                  </h1>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center h-96 text-3xl font-medium text-slate-800">Enter patient ID to proceed...</div>
          </>
        )}
        {Object.keys(user).length > 0 ? (
          <>
            <div className="flex gap-4 my-4">
              <div className="w-3/5 border rounded-lg px-4">
                <h1 className="text-sky-400 font-bold text-3xl mt-4 mb-2">
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
                      name="problem"
                      id="problem"
                      value={MedicinesPres.problem}
                      onChange={handleInputs}
                      type={"text"}
                    />
                  </div>
                  <div className="mb-2 flex items-end">
                    <span className="mr-4">Diagnosis </span>
                    <input
                      className="py-1 px-2 border-b-2 focus:outline-none w-full"
                      name="diagnosis"
                      id="diagnosis"
                      value={MedicinesPres.diagnosis}
                      onChange={handleInputs}
                      type={"text"}
                    />
                  </div>
                  <div>
                    <i className="fa-solid fa-prescription text-4xl mt-4 ml-4"></i>
                  </div>
                  {MedicinesPres.Medicines.length > 0 ? (
                    <div className="my-2">
                      {MedicinesPres.Medicines.map((val, idx) => {
                        return (
                          <>
                            <div className="flex justify-between my-2 font-medium text-red-500 border rounded-md p-4">
                              <h1 className="uppercase w-72">{val.name}</h1>
                              <h1 className="w-20">{val.quantity}</h1>
                              <div className="gap-x-2 flex w-20">
                                <input 
                                  type={"checkbox"}
                                  checked={val.morning}
                                />
                                <input
                                  type={"checkbox"}
                                  checked={val.afternoon}
                                />
                                <input
                                  type={"checkbox"}
                                  checked={val.evening}
                                />
                                <input
                                  type={"checkbox"}
                                  checked={val.night}
                                />
                              </div>
                              {val.beaf ? (
                                <h1 className="w-10">A</h1>
                              ) : (
                                <h1 className="w-10">B</h1>
                              )}
                            </div>
                          </>
                        );
                      })}
                      <div className="mt-4">
                        <label>Days to intake : </label>
                        <input type={"text"} className="p-1.5 mt-1 rounded-md border-2 border-gray-200" value={MedicinesPres.no_of_days} name="no_of_days" id="no_of_days" onChange={handleInputs} />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <button onClick={presData} className="w-20 p-2 bg-sky-400 hover:scale-110 duration-300  my-2 text-white rounded-lg">
                    Send
                  </button>
                </div>
              </div>
              <div className="w-2/5 h-96 border rounded-lg px-4 pb-2">
                <h1 className="text-2xl text-sky-400 font-bold my-2">
                  Medicines
                </h1>
                <input
                  className="border-2 rounded-lg w-full py-1.5 px-2"
                  type={"text"}
                  name="medicineSearch"
                  id="medicineSearch"
                  value={medicineSearch}
                  onChange={(e) => {
                    setMedicineSearch(e.target.value);
                    setSingleMed({ ...singleMed, name: e.target.value });
                  }}
                />
                <div>
                  <h1 className="text-xl text-red-500 font-medium mt-2">
                    {medicineSearch}
                  </h1>
                  <div className="mb-2">
                      <h6 className="text-lg font-bold text-sky-400">
                        Timings
                      </h6>
                      <div className="flex gap-x-4">
                    <div>
                      <input
                        className="mr-1"
                        type={"checkbox"}
                        name="morning"
                        id="morning"
                        value={singleMed.morning}
                        onChange={() =>
                          setSingleMed({
                            ...singleMed,
                            morning: !singleMed.morning,
                          })
                        }
                      />
                      <label>Morning</label>
                    </div>
                    <div>
                      <input
                        className="mr-1"
                        type={"checkbox"}
                        name="afternoon"
                        id="afternoon"
                        value={singleMed.afternoon}
                        onChange={() =>
                          setSingleMed({
                            ...singleMed,
                            afternoon: !singleMed.afternoon,
                          })
                        }
                      />
                      <label>Afternoon</label>
                    </div>
                    <div>
                      <input
                        className="mr-1"
                        type={"checkbox"}
                        name="evening"
                        id="evening"
                        value={singleMed.evening}
                        onChange={() =>
                          setSingleMed({
                            ...singleMed,
                            evening: !singleMed.evening,
                          })
                        }
                      />
                      <label>Evening</label>
                    </div>
                    <div>
                      <input
                        className="mr-1"
                        type={"checkbox"}
                        name="night"
                        id="night"
                        value={singleMed.night}
                        onChange={() =>
                          setSingleMed({
                            ...singleMed,
                            night: !singleMed.night,
                          })
                        }
                      />
                      <label>Night</label>
                    </div>
                  </div>
                  </div>
                  <div>
                    <h6 className="text-lg text-sky-400 font-bold">
                      Before / After
                    </h6>
                    <input
                      type={"radio"}
                      name="be/af"
                      value={singleMed.beaf}
                      onChange={() => {
                        setSingleMed({ ...singleMed, beaf: 0 });
                      }}
                    />
                    <label className="mr-4">Before</label>
                    <input
                      type={"radio"}
                      name="be/af"
                      value={singleMed.beaf}
                      onChange={() => {
                        setSingleMed({ ...singleMed, beaf: 1 });
                      }}
                    />
                    <label>After</label>
                  </div>
                  <div>
                    <h6 className="text-lg text-sky-400 font-bold">
                      Quantity
                    </h6>
                    <input
                      className="p-1.5 mt-1 rounded-md border-2 border-gray-200"
                      type={"number"}
                      name="quantity"
                      id="quantity"
                      value={singleMed.quantity}
                      onChange={(e) => {
                        setSingleMed({
                          ...singleMed,
                          quantity: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      setMedicinesPres({
                        ...MedicinesPres,
                        Medicines:
                          MedicinesPres.Medicines.concat(singleMed),
                      });
                    }}
                    className="w-20 p-2 bg-sky-400 hover:scale-110 transistion-all duration-300 my-2 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UserSearch;