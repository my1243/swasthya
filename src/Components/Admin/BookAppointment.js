import { useState } from "react";

const BookAppointment = () => {
    const dayArr = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dateobj = {
        day: dayArr[new Date().getDay()],
        date: new Date().toLocaleDateString()
    }
    const date = [{
        day: dayArr[new Date(Date.now() + (86400000 * 0)).getDay()],
        date: new Date().toLocaleDateString()
    },
    {
        day: dayArr[new Date(Date.now() + (86400000 * 1)).getDay()],
        date: new Date(Date.now() + (86400000 * 1)).toLocaleDateString()
    },
    {
        day: dayArr[new Date(Date.now() + (86400000 * 2)).getDay()],
        date: new Date(Date.now() + (86400000 * 2)).toLocaleDateString()
    },
    {
        day: dayArr[new Date(Date.now() + (86400000 * 3)).getDay()],
        date: new Date(Date.now() + (86400000 * 3)).toLocaleDateString()
    },
    {
        day: dayArr[new Date(Date.now() + (86400000 * 4)).getDay()],
        date: new Date(Date.now() + (86400000 * 4)).toLocaleDateString()
    }]

    const [ddate, setDDate] = useState({});
    const [ttime, setTTime] = useState("");
    const [flag, setFlag] = useState(false);

    const time = [
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
        "17:00 - 18:00",
        "18:00 - 19:00",
        "19:00 - 20:00",
        "20:00 - 20:30",
    ]
    const [pid, setPID] = useState("");
    const [user, setUser] = useState({});

    const searchPat = async (e) => {
        e.preventDefault();
        const idx = pid;
        const res = await fetch("/searchUser", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({ idx })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            console.log("Invalid details");
        } else {
            setUser(data);
        }
    }

    const postData = async () => {
        const { day, date } = ddate;
        const { PID, fname, lname, mobile } = user;
        const time = ttime;
        try {
            const res = await fetch("/bookapp", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ PID, fname, lname, mobile, day, date, time })
            })
            const data = await res.json();
            if (!data || res.status === 400 || res.status === 404) {
                console.log("Error: Appointment not booked");
            } else {
                console.log("Appointment booked successfully");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="m-4 w-full">
                <div>
                    <h1 className="text-4xl font-semibold my-2">Book Appointment for Patient...</h1>
                    <div className="h-2 bg-neutral-800 rounded-full w-[40rem]"></div>
                </div>
                <div className="my-4 flex flex-col w-full sm:flex-row items-start justify-center h-16 sm:items-center border rounded-2xl">
                    <h1 className="text-xl font-medium text-red-500">Search for patient</h1>
                    <input type={"text"} className="p-2 mx-4 rounded-lg placeholder-slate-900 border border-gray-300 outline-none focus:border-neutral-300 transistion-all duration-33 ease-linear" id="pid" name="pid" value={pid} onChange={(e) => setPID(e.target.value)} />
                    <button onClick={searchPat}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                {Object.keys(user).length > 0 ?
                    <>
                        {console.log(date)}
                        <div className="border rounded-xl p-4">
                            <h1 className="text-2xl text-emerald-700 font-bold mb-2">Patient details</h1>
                            <div className="flex items-center justify-between ">
                                <div className="flex gap-x-2">
                                    <h1 className="text-lg font-semibold">Name:</h1>
                                    <h1 className="text-lg text-red-500 font-medium">{user.fname} {user.lname}</h1>
                                </div>
                                <div className="flex gap-x-2">
                                    <h1 className="text-lg font-semibold">Age:</h1>
                                    <h1 className="text-lg text-red-500 font-medium">{user.age}</h1>
                                </div>
                                <div className="flex gap-x-2">
                                    <h1 className="text-lg font-semibold">Blood Group:</h1>
                                    <h1 className="text-lg text-red-500 font-medium">{user.bgroup}</h1>
                                </div>
                                <div className="flex gap-x-2">
                                    <h1 className="text-lg font-semibold">Gender:</h1>
                                    <h1 className="text-lg text-red-500 font-medium">{user.gender}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex bg-gray-200 items-center justify-center h-16 my-2 p-2 border rounded-lg">
                            <label className="mr-4 font-medium text-lg">Select Department</label>
                            <select className="p-2 rounded-lg" id="dept" name="dept">
                                <option className="p-2" value={"none"}>Select</option>
                                <option className="p-2" value={"Cardiology"}>Cardiology</option>
                                <option className="p-2" value={"Dialysis"}>Dialysis</option>
                                <option className="p-2" value={"Eye"}>Eye</option>
                                <option className="p-2" value={"Skin"}>Skin</option>
                                <option className="p-2" value={"OPD"}>OPD</option>
                            </select>
                        </div>

                        <h1 className="text-xl text-red-500 font-bold mt-4 mb-2">Select Date</h1>
                        <ul className="filter-switch inline-flex relative w-full gap-4 mb-4 items-center justify-between text-black">
                            {
                                date.map((val, idx) => {
                                    return (
                                        <>
                                            <li onClick={() => setDDate(val)} className={`flex w-full flex-col items-center rounded-md font-bold p-2 border-2 cursor-pointer transition-all duration-300 ${ddate.date === val.date ? "bg-blue-700" : "bg-gray-50"}`}>
                                                <label className={`hover:text-gray-800 ${ddate.date === val.date ? "text-white" : "text-gray-600"}`}>
                                                    <h1>{val.day}</h1>
                                                    <h1>{val.date}</h1>
                                                </label>
                                            </li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                        <h1 className="text-xl text-red-500 font-bold my-2">Select Time</h1>
                        <div className="grid grid-cols-6 text-center gap-x-8 gap-y-4">
                            {
                                time.map((val, idx) => {
                                    return (
                                        <>
                                            <h1 className={`p-2 border font-medium hover:text-gray-800 rounded-lg cursor-pointer transition-all duration-300 ${ttime === val ? "text-white bg-blue-700" : "text-gray-600 bg-gray-50"}`} onClick={() => { setTTime(val) }}>{val}</h1>
                                        </>
                                    )
                                })
                            }
                        </div>
                        {console.log(ttime)}
                        <button onClick={postData} className="p-2 bg-blue-700 rounded-md text-white font-medium px-4 my-5 hover:text-black hover:bg-blue-300 transition-all duration-200">Book Appointment</button>
                    </> : <></>
                }

            </div>
        </>
    )
}

export default BookAppointment;