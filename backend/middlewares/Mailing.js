const nodemailer = require("nodemailer");

const pass = process.env.PASS;
const email = process.env.EMAIL;
var transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
      user: email,
      pass: pass
    }
  });

transporter.verify((err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Server is ready to send messages");
    }
});

module.exports = transporter;

