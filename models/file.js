const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
   name:{
      type:String,
      required:true,
   },
   imageUrl:{
      type:String,
   },
   tags:{
      type:String,
   },
   email:{
      type:String,
   }
})

fileSchema.post("save",async (doc)=>{
   console.log(doc);
   try{
      let transporter = nodemailer.createTransport({
         host:process.env.MAIL_HOST,
         auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
         },
      })

      let info = await transporter.sendMail({
         from:`New Project Testing`,
         to:doc.email,
         subject:"New File SUccessfully Uploaded in Cloudinary",
         html:`<h2>Hello Testing automated email Sending</h2><p><a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
      })
   }
   catch(e){
      console.error(e);
   }
})

module.exports = mongoose.model("File",fileSchema);