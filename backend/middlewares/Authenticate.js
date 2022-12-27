const jwt = require("jsonwebtoken");
const Patient = require('../models/Patient');

const authenticate = async (req,res,next) =>{
    try{
        const token = req.cookies.jwtoken;
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

module.exports = authenticate;