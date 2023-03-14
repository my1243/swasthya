import moment from "moment/moment";
import { useState } from "react";

const CheckAppointment = () => {
    const [dt,setDt] = useState(new Date());
    const [date,setDate] = useState(new Date().toLocaleDateString());
    const [patients, setPatients] = useState([]); 
    const postData = async (e) => {
        e.preventDefault();
        try{
            const dx = moment(date).format("M/D/YYYY");
            console.log(dx);
            const res = await fetch("/getAppointments",{
                headers:{
                    "Content-Type":"Application/json"
                },
                method:"POST",
                body:JSON.stringify({dx})
            });
            const data = await res.json();
            if(!data || res.status === 422){
                console.log("not found");
            }else{
                console.log(data);
                setPatients(data);
            }
        }catch(err){
            console.log(err);
        }
    }
  return (
    <>
      <div className="m-4 w-full">
      <h1 className="text-4xl font-semibold mt-4 mb-2">Upcoming Appointments...</h1>
      <div className="h-2 bg-neutral-800 rounded-full mb-2 w-[36rem]"></div>
        <div className="h-16 mb-4 border rounded-lg flex gap-x-4 justify-center items-center">
          <h3>Date</h3>
          <input type={"date"} name="date" value={date} className="border-2 p-1 rounded-md" onChange={(e) => setDate(e.target.value)}/>
          <button onClick={postData}><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        { Object.keys(patients).length> 0 &&
        <div className="grid grid-cols-1 gap-x-4">
          {patients.map((val, idx) => {
            return (
              <div key={idx} className="flex p-2 border my-2 rounded-lg justify-between">
                <h1>{idx + 1}</h1>
                <h1>{val.PID}</h1>
                <h1>{val.fname} {val.lname}</h1>
                <h1>{val.mobile}</h1>
              </div>
            );
          })}
        </div>
        }
      </div>
    </>
  );
};

export default CheckAppointment;
