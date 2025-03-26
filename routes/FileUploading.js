const express = require("express");
const router = express.Router();

const {localFileUpload,imageUpload,videoUpload , imageSizeReducedUpload} = require("../controllers/fileupload");


router.post("/localfileupload",localFileUpload);
router.post("/imageupload",imageUpload);
router.post("/videoupload",videoUpload);
router.post("/imagesizereducedupload",imageSizeReducedUpload);

module.exports = router ; 