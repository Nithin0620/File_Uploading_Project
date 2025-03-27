const File = require("../models/file")
const Cloudinary = require("Cloudinary")

exports.localFileUpload = async(req,res)=>{
   try{
      const file = req.files.files;
      console.log(file);

      let path = __dirname + "/files/" +Date.now() + `.${file.name.split(".")[1]}`;
      console.log(path);

      file.mv(path,(e)=>{
         console.log(e);
      })

      res.json({
         success:true,
         message:'Local File Uploaded Successfully'
      });
   }
   catch(e){
      return res.json({
         success:false,
         message:"Error Occured"
      })
   }
};

async function isFileSupported(fileType,supportedFiles){
   return supportedFiles.includes(fileType);
}

async function uploadFiletoCloudinary(file,folder,quality){
   const options ={folder};

   if(quality){
      options.quality = quality;
   }

   options.resource_type = "auto";

   return await Cloudinary.uploader.upload(file.tempFilePath , options)
}


exports.imageUpload = async(req,res)=>{
   try{
      const {name,email,tags} = req.body;
      
      const file= req.files.imageFile;

      const supportedFiles = ["jpg", "jpeg" , "png"];
      const fileType = file.name.split(".")[1].toLowerCase();

      if(!isFileSupported(fileType,supportedFiles)){
         return res.status(400).json({
            success:false,
            message:"This file type is not supported",
         })
      }

      const response = await uploadFiletoCloudinary(file,"Learning_FileUpload");


      const fileData = await File.create({
         name,
         tags,
         email,
         imageUrl : response.secure_url,
      });

      res.json({
         success:true,
         imageUrl : response.secure_url,
         message: "Image Successfully Uploaded",
      })

   }
   catch(e){
      return res.status(400).json({
         success:false , 
         message:"Sumething Went Wrong",
      });
   }
}


exports.videoUpload = async (req,res) =>{
   try{
      const {name,tags,email} = req.body;
      console.log(name,tags,email);

      const file = req.files.videoFile;
      console.log("Video file:", file);
      console.log("yeh prit ho raha he?")

      const supportedFiles =["mp4" , "mov"];
      const fileType = file.name.split(".")[1].toLowerCase();

      if(!await isFileSupported(fileType,supportedFiles)){
         return res.status(400).json({
            success:false,
            message:"File Format not supported",
         })
      }

      const response= await uploadFiletoCloudinary(file , "Learning_FileUpload");

      const fileData = await File.create({
         name,
         tags,
         email,
         imageUrl:response.secure_url,
      })

      res.json({
         success:true,
         imageUrl : response.secure_url,
         message:"video Successfully Uploaded",
      })
   }
   catch(e){
      res.status(400).json({
         success:false,
         message:"something went wrong",
      })
   }
}

exports.imageSizeReducedUpload = async(req,res)=>{
   try{
      const {name,email,tags} = req.body;
      console.log(name,tags,email);

      const file= req.files.imageFile;
      console.log(file);

      const supportedFiles = ["jpg", "jpeg" , "png"];
      const fileType = file.name.split(".")[1].toLowerCase();
      console.log("File Type:", fileType);

      if(await !isFileSupported(fileType,supportedFiles)){
         return res.status(400).json({
            success:false,
            message:"This file type is not supported",
         })
      }

      const response = await uploadFiletoCloudinary(file,"Learning_FileUpload",20);


      const fileData = await File.create({
         name,
         tags,
         email,
         imageUrl : response.secure_url,
      });

      res.json({
         success:true,
         imageUrl : response.secure_url,
         message: "Image Successfully Uploaded",
      })

   }
   catch(e){
      return res.status(400).json({
         success:false , 
         message:"Something Went Wrong",
      });
   }
}

