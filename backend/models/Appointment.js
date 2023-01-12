const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date:{
        type:String,
        require:true
    },
    aval:{
        type:Number,
        require:true
    },
    patient:[
        {
            PID:{
                type:String,
                require:true
            },
            fname:{
                type:String,
                require:true
            },
            lname:{
                type:String,
                require:true
            },
            time:{
                type:String,
                require:true
            }
        }
    ],
});

const Appointment = new mongoose.model("Appointment",appointmentSchema);
module.exports = Appointment;