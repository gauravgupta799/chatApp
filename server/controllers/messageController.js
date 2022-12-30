const messageModel = require("../models/messageModel");

const addMessage = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await messageModel.create({
            message:{text: message },
            users: [from, to],
            sender: from,
        });
        if(data) return res.status(200).json({msg:"Message added successfully!"});
        return res.status(403).json({msg:"Failed to add message to the database."})       
    } catch (error) {
        res.status(500).json({msg:error.message});
        console.log(error.message);
    }
};

const getAllMessages = async (req, res, next) => {
    try {
        const {from, to } = req.body;
        const messages = await messageModel.find({
            users:{
                $all: [from, to],
            },
        }).sort({updatedAt: 1});
        const projectMessages = messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });
        res.status(200).json(projectMessages) 
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
};

// const deleteMeassage = async (req, res, next) => {};
// const updateMessage = async (req, res, next) => {};


module.exports = {addMessage,getAllMessages }