const express = require("express");
const router = express.Router();
require("../db/conn");
const Patient = require("../models/Patient");
const Resource = require("../models/Resource");
const transporter = require("../middlewares/Mailing");
const bcrypt = require("bcryptjs");
const authenticate = require("../middlewares/Authenticate");
const randomString = require("randomstring");
const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Admin = require("../models/Admin");

router.get("/", (req, res) => {
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

router.get("/logged", authenticate, (req, res) => {
    console.log("hello from logged");
    res.send(req.rootUser);
})

router.post("/patSignup", async (req, res) => {
    console.log("mihir");
    const { fname, lname, email, bgroup, gender, address, mobile, age } = req.body;
    if (!fname || !lname || !email || !bgroup || !gender || !address || !mobile || !age) {
        return res.status(422).json({ error: "Please enter all fields" });
    }
    try {
        const PatientExists = await Patient.findOne({ email: email });
        if (PatientExists) {
            return res.status(422).json({ error: "Email already exist" });
        } else {
            let password = randomString.generate(10);
            let x = new Date().getFullYear().toString().substr(2, 2) + "PS";
            const getRes = await Resource.findOne({ ID: "2022" });
            x += getRes.init_var;
            getRes.init_var++;
            const d = await Resource.findOneAndUpdate({ ID: "2022" }, { init_var: getRes.init_var });
            console.log(d);
            console.log(x);
            const patient = new Patient({
                PID: x, fname, lname, email, password, bgroup, gender, address, mobile, age
            });
            const data = await patient.save();
            if (data) {
                var mailOptions = {
                    from: '"Swasthya 24/7" <customer.swasthya@gmail.com>',
                    to: email,
                    subject: 'User Credentials for Swasthya',
                    text: `Thank you for registering with Swasthya... We are always ready to to serve you well.\nWe are providing your user credentials to login on our Android/IOS application.\n\nPatient ID: ${x}\nUsername: ${email}\nPassword: ${password}`
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(`Message sent ${info.messageId}`);
                });
                res.status(201).json({ message: "data stored successfully" });
            }
        }
    } catch (err) {
        console.log(err);
    }
})

router.post("/doctSignup", async (req, res) => {
    console.log("mihir");
    const { fname, lname, email, mobile, education, post, ig, ln } = req.body;
    if (!fname || !lname || !email || !mobile || !education || !post) {
        return res.status(422).json({ error: "Please enter all required fields" });
    }
    try {
        const doctorExists = await Doctor.findOne({ email: email });
        if (doctorExists) {
            return res.status(422).json({ error: "Email already exist" });
        } else {
            let password = randomString.generate(10);
            let doctor;
            if (ig) {
                doctor = new Doctor({
                    fname, lname, email, password, mobile, education, post, ig
                });
            } else if (ln) {
                doctor = new Doctor({
                    fname, lname, email, password, mobile, education, post, ln
                });
            } else if (ig && ln) {
                doctor = new Doctor({
                    fname, lname, email, password, mobile, education, post, ig, ln
                });
            } else {
                doctor = new Doctor({
                    fname, lname, email, password, mobile, education, post
                });
            }
            const data = await doctor.save();
            if (data) {
                var mailOptions = {
                    from: '"Swasthya 24/7" <customer.swasthya@gmail.com>',
                    to: email,
                    subject: 'User Credentials for Swasthya',
                    text: `Thank you for joining with Swasthya... We are always ready to serve you well.\nWe are providing your user credentials to login on our Web Portal\n\Username ${email}\nPassword: ${password}`
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(`Message sent ${info.messageId}`);
                });
                res.status(201).json({ message: "data stored successfully" });
            }
        }
    } catch (err) {
        console.log(err);
    }
})

router.post("/searchUser", async (req, res) => {
    const idx = req.body.idx;
    console.log(idx);
    try {
        const data = await Patient.findOne({ PID: idx });
        if (data) {
            res.status(201).json(data);
        } else {
            res.status(422).json({ "error": "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async (req, res) => {
    console.log("hi");
    try {
        const pid = req.body.PatientID;
        const pass = req.body.password1;
        if (!pid || !pass) {
            return res.status(400).json({ error: "Plz fill all details correctly" });
        }

        const PatientExists = await Patient.findOne({ pid: pid });
        if (PatientExists) {
            const isMatch = await bcrypt.compare(pass, PatientExists.password);
            const token = await PatientExists.generateAuthToken();
            // console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 1296000000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid" });
            } else {
                res.status(201).json(PatientExists);
            }
        } else {
            res.status(400).json({ error: "Invalid details" });
        }
        console.log(PatientExists);
    } catch (err) {
        console.log(err);
    }
})

router.post('/doctlogin', async (req, res) => {
    console.log("hi");
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(400).json({ error: "Plz fill all details correctly" });
        }

        const doctorExists = await Doctor.findOne({ email: email });
        if (doctorExists) {
            const isMatch = await bcrypt.compare(password, doctorExists.password);
            const token = await doctorExists.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 1296000000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid" });
            } else {
                res.status(201).json(doctorExists);
            }
        } else {
            res.status(400).json({ error: "Invalid details" });
        }
        console.log(doctorExists);
    } catch (err) {
        console.log(err);
    }
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

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 1296000000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid" });
            } else {
                res.status(201).json(adExists);
            }
        } else {
            res.status(400).json({ error: "Invalid details" });
        }
        console.log(adExists);
    } catch (err) {
        console.log(err);
    }
})

router.post("/prescribe", async (req, res) => {
    console.log("hi");
    try {
        const { PID, fname, lname, prescription } = req.body;
        const userExist = await Prescription.findOne({ PID });
        if (userExist) {
            const data = await Prescription.findOneAndUpdate({ PID }, { $push: { "prescription": prescription } });
            if (data) {
                res.status(201).json({ msg: "Updated successfully" });
            }
        } else {
            const newPres = new Prescription({ PID, fname, lname, prescription });
            const data = await newPres.save();
            if (data) {
                res.status(201).json({ msg: "Created successfully" });
            }
        }
    } catch (err) {
        res.status(400).json({ msg: "error" });
        console.log(err);
    }
})

router.post("/bookapp", async (req, res) => {
    console.log("hi");
    try {
        const { PID, fname, lname, date, time } = req.body;
        const uExists = await Appointment.findOne({ date });
        const obj = { PID: PID, fname: fname, lname: lname, time: time };
        if (uExists) {
            if (uExists.aval === 0) {
                res.status(400).json({ msg: "Appointment quota full!" });
            } else {
                const data = await Appointment.findOneAndUpdate({ date }, { aval: uExists.aval - 1, $push: { patient: obj } });
                if (data) {
                    res.status(201).json({ msg: "Updated successfully" });
                }
            }
        } else {
            const newAppointment = new Appointment({ date, aval: 60, patient: obj });
            const data = await newAppointment.save();
            if (data) {
                res.status(201).json({ msg: "created successfully" });
            }
        }
    } catch (err) {
        res.status(404).json({ msg: "Error" });
        console.log(err);
    }
})

router.post("/getLatestPrescription", async (req, res) => {
    console.log("kjdhgf");
    console.log(req.body);
    try {
        const PID = req.body.PID;
        // console.log(PID);
        const data = await Prescription.findOne({ PID });
        console.log(data);
        if (data) {
            res.status(201).json(data.prescription[data.prescription.length - 1]);
        } else {
            res.status(422).json({ msg: "invalid patient id" });
        }
    } catch (err) {
        console.log(err);
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("user logout");
});


const { spawn } = require('child_process');

router.post('/pythondadta', (req, res) => {
    const pythonProcess = spawn('python', ['./Disease-Prediction-from-Symptoms-master/infer.py', req.body.selected]);
    // console.log(pythonProcess.stdout)
    var dataReceived = '';

    // // Receive data from Python process
    pythonProcess.stdout.on('data', (data) => {
        console.log("Data is ", data)
        dataReceived += data.toString();
        console.log(`Received data from Python process: ${dataReceived}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('stderr: ', data.toString('utf8'));
    })

    // Handle end of Python process
    pythonProcess.on('exit', (code) => {
        console.log(`Python process exited with code ${code}`);
        console.log(`Final data received from Python process: ${dataReceived}`);
        res.status(200).json({ success: true, data: dataReceived });  // Send the received data back as response
    });
    // console.log(req.body.selected);
});

module.exports = router;