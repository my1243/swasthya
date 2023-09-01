const router = require("express").Router();
const Patient = require("../models/Patient");
const Resource = require("../models/Resource");
const transporter = require("../middlewares/Mailing");
const bcrypt = require("bcryptjs");
const authenticate = require("../middlewares/Authenticate");
const randomString = require("randomstring");
const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");

router.get("/plogged", authenticate.authenticate3, (req, res) => {
    console.log("hello from logged");
    res.status(200).json(req.rootUser);
})

router.post("/searchUser", async (req, res) => {
    const idx = req.body.idx;
    console.log(idx);
    try {
        const data = await Patient.findOne({ PID: idx });
        if (data) {
            res.status(201).json({data:data, message:"User found!", success:true});
        } else {
            res.status(422).json({ message:"error: Invalid Credentials",success:false});
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async (req, res) => {
    console.log("hi");
    try {
        const pid = req.body.PatientID.trim();
        const pass = req.body.password1.trim();
        if (!pid || !pass) {
            return res.status(400).json({ error: "Plz fill all details correctly" });
        }
        console.log(pid + "  " + pass);
        const PatientExists = await Patient.findOne({ PID: pid }).select("-tokens");
        if (PatientExists) {
            const isMatch = await bcrypt.compare(pass, PatientExists.password);
            if (!isMatch) {
                res.status(400).json({ error: "Invalid" });
            } else {
                const token = await PatientExists.generateAuthToken();
                console.log(token);

                res.cookie("pwtoken", token, {
                    expires: new Date(Date.now() + 1296000000),
                    httpOnly: true
                })
                console.log("patient data");
                console.log(PatientExists);
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

router.post("/patSignup", async (req, res) => {
    console.log("mihir");
    const { fname, lname, email, bgroup, gender, address, mobile, age } = req.body;
    console.log(email);
    if (!fname || !lname || !email || !bgroup || !gender || !address || !mobile || !age) {
        return res.status(422).json({ message: "Please enter all fields", success:false });
    }
    try {
        const PatientExists = await Patient.findOne({ email: email });
        if (PatientExists) {
            console.log(PatientExists);
            return res.status(422).json({ message:"error: email already exists", success:false });
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
                res.status(201).json({ message: "data stored successfully", success:true});
            }
        }
    } catch (err) {
        console.log(err);
    }
})

router.post("/bookapp", async (req, res) => {
    console.log("hi");
    try {
        const { PID, fname, lname, date, time, day, mobile } = req.body;
        const uExists = await Appointment.findOne({ date });
        const obj = { PID: PID, fname: fname, lname: lname, mobile: mobile };
        const uobj = { drname: "Dr. Ronak Shah", time, date, day };
        let data, udata;
        let flag = false;
        if (uExists) {
            uExists.timings.map(async (val, idx) => {
                console.log("ejhg")
                if (val.time === time) {
                    flag = true;
                    if (val.aval > 0) {
                        console.log("djfhgd");
                        uExists.timings[idx].aval--;
                        uExists.timings[idx].patient.push(obj);
                        data = await Appointment.findOneAndUpdate({ date }, uExists, { new: true });
                        console.log(data.timings[0].patient);
                    } else {
                        res.status(400).json({ message: "Appointment quota full!", success:false });
                    }
                }
            })
            if (!flag) {
                const y = { time: time, aval: 9, patient: obj };
                data = await Appointment.findOneAndUpdate({ date }, { $push: { "timings": y } }, { new: true });
                udata = await Patient.findOneAndUpdate({ PID }, { $push: { appointmets: uobj } }, { new: true });
                console.log(data.timings);
            }
            if (data && udata) {
                res.status(201).json({ message: "created successfully", success:true, date:date, time:time,day:day });
            }
        } else {
            const y = { time: time, aval: 9, patient: obj }
            const newAppointment = new Appointment({ date, day, timings: y });
            const data = await newAppointment.save();
            udata = await Patient.findOneAndUpdate({ PID }, { $push: { appointments: uobj } }, { new: true });
            if (data && udata) {
                res.status(201).json({ message: "created successfully", success:true ,date:date, time:time,day:day });
            }
        }
    } catch (err) {
        res.status(404).json({ message: "Error", success:false });
        console.log(err);
    }
})

router.post('/latestAppoint', async (req, res) => {
    console.log("inside latest appoint");
    try {
        const PID = req.body.PID;
        const data = await Patient.findOne({ PID });
        res.status(201).json(data.appointments[data.appointments.length - 1])
    } catch (err) {
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

const { spawn } = require('child_process');
const { log } = require("console");

router.post('/pythondadta', (req, res) => {
    console.log("kjfgd")
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

router.post("/imageUpload", async (req, res) => {
    const { id, url } = req.body;
    try {
        const userFind = await Patient.findOneAndUpdate({ _id: id }, { url: url }, { new: true });
        console.log(userFind);
        if (userFind) {
            res.status(201).json(userFind);
        } else {
            res.status(401).json({ msg: "Error while saving image" });
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;