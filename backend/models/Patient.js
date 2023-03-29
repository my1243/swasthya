const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const patientSchema = new mongoose.Schema({
    PID:{
        type:String,
        require:true
    },
    fname : {
        type: String,
        required : true
    },
    lname : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    mobile:{
        type: Number,
        require:true
    },
    bgroup:{
        type: String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    url:{
        type:String,
    },
    appointments: [
        {
            drname:{
                type:String,
                required:true
            },
            date:{
                type:String,
                required:true
            },
            time:{
                type:String,
                required:true
            },
            day:{
                type:String,
                required:true
            },
        }
    ],
    tokens : [
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
})

patientSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        console.log(`the pass is ${this.password}`);
    }
    next();
})

patientSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const Patient = new mongoose.model("Patient",patientSchema);
module.exports= Patient;