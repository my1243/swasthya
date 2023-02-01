const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  day: {
    type: String,
    require: true,
  },
  timings: [
    {
      time: {
        type: String,
        require: true,
      },
      aval: {
        type: Number,
        require: true,
      },
      patient: [
        {
            PID:{
                type:String,
                require:true
            },
          fname: {
            type: String,
            require: true,
          },
          lname: {
            type: String,
            require: true,
          },
          mobile: {
            type: String,
            require: true,
          },
        },
      ],
    },
  ],
});

const Appointment = new mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
