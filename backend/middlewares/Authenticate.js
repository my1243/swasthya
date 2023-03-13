const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const Patient = require('../models/Patient');

const authenticate1 = async (req,res,next) =>{
    try{
        console.log("ghfds")
        const token = req.cookies.dwtoken;
        console.log(token);
        // const type = req.body.type;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Doctor.findOne({_id:verifyToken._id,"tokens.token":token});
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

const authenticate2 = async (req,res,next) =>{
    try{
        console.log("jfh")
        const token = req.cookies.awtoken;
        const type = req.body.type;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Admin.findOne({_id:verifyToken._id,"tokens.token":token});
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

const authenticate3 = async (req,res,next) =>{
    try{
        console.log("jfh")
        const token = req.cookies.pwtoken;
        const type = req.body.type;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Patient.findOne({_id:verifyToken._id,"tokens.token":token});
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

module.exports = {authenticate1, authenticate2, authenticate3};