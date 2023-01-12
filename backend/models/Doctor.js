const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
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
    mobile:{
        type:Number,
        require:true
    },
    education:{
        type:String,
        require:true
    },
    post:{
        type:String,
        require:true
    },
    ig:{
        type:String,
        require:true
    },
    ln:{
        type:String,
        require:true
    }
})

doctorSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        console.log(`the pass is ${this.password}`);
    }
    next();
})

doctorSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        // this.tokens = this.tokens.concat({token:token});
        // await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const Doctor = new mongoose.model("doctor",doctorSchema);
module.exports = Doctor;