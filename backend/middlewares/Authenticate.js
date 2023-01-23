const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const Patient = require('../models/Patient');

const authenticate = async (req,res,next) =>{
    try{
        console.log("jfh")
        const token = req.cookies.jwtoken;
        const type = req.body.type;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        let rootUser;
        if(type === "Doctor")
            rootUser = await Doctor.findOne({_id:verifyToken._id,"tokens.token":token});
        else if(type === "Admin")
            rootUser = await Admin.findOne({_id:verifyToken._id,"tokens.token":token});
        else if(type === "Patient")
            rootUser = await Patient.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.id = rootUser._id;

        next();

    }catch(err){
        res.status(422).send('unauthorized: no token provided');
        console.log(err);
    }
}

module.exports = authenticate;