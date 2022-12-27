const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()
const port = process.env.PORT
const mongoUrl = process.env.MONGODB_URL

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(mongoUrl, {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Database connected successfully!")
}).catch((error)=>{
    console.log(error.message)
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})