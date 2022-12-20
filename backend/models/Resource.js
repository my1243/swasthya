const mongoose = require("mongoose");

const ResSchema = new mongoose.Schema({
    ID:{
        type:String,
        require:true
    },
    init_var:{
        type:Number,
        require:true
    }
});

const Resource = mongoose.model("Resource",ResSchema);
module.exports = Resource;