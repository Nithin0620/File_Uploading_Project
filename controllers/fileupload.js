const File = require("../models/file")

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