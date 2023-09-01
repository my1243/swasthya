const router = require("express").Router();

require("../db/conn");
const Resource = require("../models/Resource");
const transporter = require("../middlewares/Mailing");
const bcrypt = require("bcryptjs");
const authenticate = require("../middlewares/Authenticate");
const randomString = require("randomstring");
const Prescription = require("../models/Prescription");
const Doctor = require("../models/Doctor");

router.get("/dlogged", authenticate.authenticate1, (req, res) => {
    console.log("hello from logged");
    res.status(200).json({data: req.rootUser , success:true, message: "Doctor Authenticated"});
})

router.post('/doctlogin', async (req, res) => {
    console.log("hi");
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(400).json({ error: "Plz fill all details correctly",success:false });
        }

        const doctorExists = await Doctor.findOne({ email: email });
        if (doctorExists) {
            const isMatch = await bcrypt.compare(password, doctorExists.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid",success:false });
            } else {
                const token = await doctorExists.generateAuthToken();
                console.log(token);

                res.cookie("dwtoken", token, {
                    expires: new Date(Date.now() + 1296000000),
                    httpOnly: true
                })

                res.status(201).json({message:"Logged in", success:true, data: doctorExists});
            }
        } else {
            res.status(400).json({ error: "Invalid details", success:false });
        }
        console.log(doctorExists);
    } catch (err) {
        console.log(err);
    }
})

router.post("/doctSignup", async (req, res) => {
    console.log("mihir");
    const { fname, lname, email, mobile, education, post, ig, ln } = req.body;
    if (!fname || !lname || !email || !mobile || !education || !post) {
        return res.status(422).json({message: "error: Please enter all required fields" });
    }
    try {
        const doctorExists = await Doctor.findOne({ email: email });
        if (doctorExists) {
            return res.status(422).json({ message: "error: Email already exist", success:false});
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
                res.status(201).json({ message: "doctor added successfully",success:true });
            }
        }
    } catch (err) {
        console.log(err);
    }
})

router.post("/prescribe", async (req, res) => {
    console.log("hi");
    try {
      const { PID, fname, lname, prescription } = req.body;
      console.log(req.body);
      const userExist = await Prescription.findOne({ PID });
      if (userExist) {
        const data = await Prescription.findOneAndUpdate(
          { PID },
          { $push: { prescription: prescription } },
          {new:true}
        );
        if (data) {
          res.status(201).json({ message: "Updated successfully", data: data, success:true });
        }
      } else {
        const newPres = new Prescription({ PID, fname, lname, prescription });
        const data = await newPres.save();
        if (data) {
          res.status(201).json({ message: "Created successfully", data: data, success:true });
        }
      }
    } catch (err) {
      res.status(400).json({ message: "error", data: err, success:false });
      console.log(err);
    }
  });

  router.get("/logout", (req, res) => {
    res.clearCookie("dwtoken", { path: "/" });
    res.status(200).json({message:"user logout", success:true});
});


module.exports = router;
