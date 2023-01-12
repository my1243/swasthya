const CheckAppointment = () => {
  return (
    <>
      <div className="m-4 w-full">
      <h1 className="text-4xl font-semibold mt-4 mb-2">Upcoming Appointments...</h1>
      <div className="h-2 bg-neutral-800 rounded-full mb-2 w-[36rem]"></div>
        <div className="h-16 mb-4 border rounded-lg flex gap-x-4 justify-center items-center">
          <h3>Date</h3>
          <input
            type={"date"}
            name="adate"
            id="adate"
            className="border rounded-lg p-2"
          />
        </div>
        <div className="grid grid-cols-1 gap-x-4">
          {[...Array(8)].map((val, idx) => {
            return (
              <div className="flex p-2 border my-2 rounded-lg justify-between">
                <h1>{idx + 1}</h1>
                <h1>Patient Name</h1>
                <h1>Age</h1>
                <h1>Mobile No</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CheckAppointment;
