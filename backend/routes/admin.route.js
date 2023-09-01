const router = require("express").Router();

require("../db/conn");
const bcrypt = require("bcryptjs");
const authenticate = require("../middlewares/Authenticate");
const Appointment = require("../models/Appointment");
const Admin = require("../models/Admin");

router.get("/alogged", authenticate.authenticate2, (req, res) => {
    console.log("hello from logged");
    res.status(200).json({data:req.rootUser, success:true});
})

router.post("/adminlog", async (req, res) => {
    console.log("hjd");
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json({ msg: "error" });
        }
        const adExists = await Admin.findOne({ email: email });
        if (adExists) {
            const isMatch = await bcrypt.compare(password, adExists.password);
            const token = await adExists.generateAuthToken();
            console.log(token);

            res.cookie("awtoken", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({success:false, message: "Invalid credentials"});
            } else {
                res.status(201).json({data: adExists, success:true});
            }
        } else {
            res.status(400).json({ success:false, message: "Invalid credentials" });
        }
        console.log(adExists);
    } catch (err) {
        console.log(err);
    }
})

router.post("/getAppointments", async (req, res) => {
    console.log("jkk");
    try {
        const { dx } = req.body;
        const dateExists = await Appointment.findOne({ date: dx });
        if (!dateExists) {
            res.status(200).json({ message: "No Appointment", success:true });
        }
        const sendData = [];
        dateExists.timings.map((val, idx) => {
            val.patient.map((valx, idx) => {
                sendData.push(valx);
            })
        })
        console.log(sendData);
        res.status(201).json({data: sendData, success:true, count: sendData.length, message:"List of appointments"});
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
