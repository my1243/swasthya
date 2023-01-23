const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

adminSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        // this.tokens = this.tokens.concat({token:token});
        // await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const Admin = new mongoose.model("admin",adminSchema);
module.exports = Admin;