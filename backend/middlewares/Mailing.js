const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
      user: "mihiryarra@gmail.com",
      pass: "mdjhnybfbyuvfyqi"
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

