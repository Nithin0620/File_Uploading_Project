const express = require("express");
const app = express();
require("dotenv").config();
PORT = process.env.PORT || 8000;

app.use(express.json());

const fileupload = require("express-fileupload");

app.use(fileupload({
   useTempFiles: true,
   tempFileDir: '/tmp/'
}));

const db = require("./config/database");
db.connect();

const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect.cloudinaryConnect();


const uploads = require("./routes/FileUploading");
app.use("/api/v1/upload",uploads);

app.listen(PORT,()=>{
   console.log(`app Started at port number ${PORT}`);
})