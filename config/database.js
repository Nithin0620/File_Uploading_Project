const mongoose = require("mongoose");
require("dotenv").config();

exports.connectdb = async(req,res) =>{
   mongoose.connect(process.env.MONGODB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(()=>{
      console.log("DB connect Successfully");
   })
   .catch((e)=>{
      console.log("Error occured in connect with the db");
      console.error(e);
      process.exit(1);
   })
}