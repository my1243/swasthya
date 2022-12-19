const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
const db = process.env.DB_URL;

mongoose.connect(db)
.then(()=>{
    console.log("connection sucessfull...");
}).catch((err)=>{
    console.log(err);
})