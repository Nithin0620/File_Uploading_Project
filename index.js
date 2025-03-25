const express = rewuire("express");
const app = express();
require("dotenv").config();


PORT = process.env.PORT || 8000;

app.use(express.json());

app.listen(PORT,()=>{
   console.log(`app Started at port number ${PORT}`);
})