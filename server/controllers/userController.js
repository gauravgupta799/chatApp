const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const register = async (req,res) => {
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username: username});
        usernameCheck && res.status(409).json({msg:"Username already exits",status:false})
        const emailCheck = await User.findOne({email: email});
        emailCheck && res.status(409).json({msg:"Email already exits",status:false})
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const user = await new User({username,email, password:hashPass});
        res.status(200).json({user, status:200, msg:"User created successfully!"});
    }catch (error) {
        res.status(500).json({ message: err.message });
		console.log(err);
    }
}

module.exports = {register}