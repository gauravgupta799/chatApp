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

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        !user && res.status(409).json({message:"User does not exist.", status:false})
        const validatePass = await bcrypt.compare(password, user.password);
        if(validatePass){
            const accessToken = jwt.sign({id:user._id, email:user.email}, "secret-key", {expiresIn:'24h'});
            const {password, ...otherInfo} = user._doc;
            res.status(200).json({
                status:200,
                message:"You've logged in successfully!",
                accessToken:accessToken,
                user:otherInfo
            })
        }else{
            res.status(403).json({message:"Invalid password or email.",status:false})
            console.log({message:"Invalid password or email.",status:false})
        }
    } catch (error) {
        res.status(500).json({message: err.message,status:false});
        console.log({message: err.message,status:false});
    }

}

module.exports = {register,login}