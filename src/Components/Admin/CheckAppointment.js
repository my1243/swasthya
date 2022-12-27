const CheckAppointment = () => {
    return(
        <>
            <div className="m-4">
            <div className="h-16 mb-4 border rounded-lg flex gap-x-4 justify-center items-center">
                <h3>Date</h3>
                <input type={"date"} name="adate" id="adate" className="border rounded-lg p-2"/>
            </div>
            <div className="grid grid-cols-1 gap-x-4">
                {
                    [...Array(8)].map((val,idx) => {
                        return(
                            <div className="flex p-2 border my-2 rounded-lg justify-between">
                                <h1>{idx+1}</h1>
                                <h1>Patient Name</h1>
                                <h1>Age</h1>
                                <h1>Mobile No</h1>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </>
    )
}

export default CheckAppointment;