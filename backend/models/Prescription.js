const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    PID:{
        type:String,
        require:true
    },
    fname : {
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    prescription: [
        { 
                date:{
                    type:String,
                    require:true
                },
                problem:{
                    type:String,
                    require: true
                },
                diagnosis:{
                    type:String,
                    require:true
                },
                Medicines:[
                    {
                        name:{
                            type:String,
                            require:true
                        },
                        morning:{
                            type:Boolean,
                            require:true
                        },
                        afternoon:{
                            type:Boolean,
                            require:true
                        },
                        evening:{
                            type:Boolean,
                            require:true
                        },
                        night:{
                            type:Boolean,
                            require:true
                        },
                        beaf:{
                            type:Boolean,
                            require:true
                        },
                        quantity:{
                            type:Number,
                            require:true
                        }
                    }
                ],
                no_of_days : {
                    type:Number,
                    require:true
                }
        }
    ]
});

const Prescription = new mongoose.model("Prescription",prescriptionSchema);
module.exports = Prescription;