const express = require("express");
const router = express.Router();
require("../db/conn");
const Patient = require("../models/Patient");
const Resource = require("../models/Resource");
const transporter = require("../middlewares/Mailing");
const bcrypt = require("bcryptjs");
const authenticate = require("../middlewares/Authenticate");

router.get("/", (req,res) => {
    res.send("Hello hiya router");
})

// dummy router

// router.post("/gk",async (req,res) => {
//     const resk = new Resource({
//         ID:"2022",
//         init_var:1
//     });
//     const data = await resk.save();
//     res.send(data);
//     // console.log(data);
// })

router.post("/patSignup", async (req,res) => {
    console.log("mihir");
    const {fname, lname, email, password, bgroup, gender, address, mobile, age} = req.body;
    if(!fname || !lname || !email || !password || !bgroup || !gender || !address || !mobile || !age){
        return res.status(422).json({error: "Please enter all fields"});
    }
    try{
        const PatientExists = await Patient.findOne({email: email});
        if(PatientExists){
            return res.status(422).json({ error: "Email already exist" });
        }else{
            let x = new Date().getFullYear().toString().substr(2,2) + "PS";
            const getRes = await Resource.findOne({ID : "2022"});
            x+=getRes.init_var;
            getRes.init_var++;
            const d = await Resource.findOneAndUpdate({ID:"2022"}, {init_var:getRes.init_var}); 
            console.log(d);
            console.log(x);
            const patient = new Patient({
                PID:x, fname, lname, email, password, bgroup, gender, address, mobile, age
            });
            const data = await patient.save();
            if(data){
                var mailOptions = {
                    from : '"Swasthya 24/7" <mihiryarra@gmail.com',
                    to: email,
                    subject:'User Credentials for Swasthya',
                    text:`Thank you for registering with Swasthya... We are always ready to to serve you well.\nWe are providing your user credentials to login on our Android/IOS application.\n\nPatient ID: ${x}\nUsername: ${email}\nPassword: ${password}`
                }

                transporter.sendMail(mailOptions, (err,info) => {
                    if(err){
                        return console.log(err);
                    }
                    console.log(`Message sent ${info.messageId}`);
                });
                res.status(201).json({ message: "data stored successfully" });
            }
        }
    }catch(err){
        console.log(err);
    }
})

router.post("/searchUser", async (req,res) => {
    const idx = req.body.idx;
    console.log(idx);
    try{
        const data = await Patient.findOne({PID:idx});
        if(data){
            res.status(201).json(data);
        }else{
            res.status(422).json({"error":"Invalid credentials"});
        }
    }catch(err){
        console.log(err);
    }
})

router.post('/login', async (req,res) => {
    console.log("hi");
    try{
        const pid = req.body.PatientID;
        const pass = req.body.password1;
        if(!pid || !pass){
            return res.status(400).json({error : "Plz fill all details correctly"});
        }

        const PatientExists = await Patient.findOne({pid:pid});
        if(PatientExists){
            const isMatch = await bcrypt.compare(pass,PatientExists.password);
            const token = await PatientExists.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 1296000000),
                httpOnly:true
            })

            if(!isMatch){
                res.status(400).json({error: "Invalid"});
            }else{
                res.status(201).json(PatientExists);
            }
        }else{
            res.status(400).json({error: "Invalid details"});
        }
        console.log(PatientExists);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;