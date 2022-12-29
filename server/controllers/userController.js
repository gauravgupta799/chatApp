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
        const user = await new User({username,email, password:hashPass}).save();
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
            res.status(200).json(
                {  
                    ...otherInfo, 
                    status:200,
                    message:"You've logged in successfully!",
                    accessToken:accessToken,
                }
            )
        }else{
            res.status(403).json({message:"Invalid password or email.",status:false})
            console.log({message:"Invalid password or email.",status:false})
        }
    } catch (error) {
        res.status(500).json({message: err.message,status:false});
        console.log({message: err.message,status:false});
    }

}

const setAvatar = async (req, res,next) => {
    try {
        const userId  = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
           avatarImage,
        });
        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image:userData.avatarImage,
        });
    } catch (ex) {
        next(ex);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email", "username","avatarImage","id",
        ]);
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}
module.exports = {register,login,setAvatar,getAllUsers}