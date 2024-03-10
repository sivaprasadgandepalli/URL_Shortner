const { handlePostRequest, handleGetRequest } = require("../controllers/urlController");
const express = require('express');
const router = express.Router();
const {CheckURL}=require("../middlewares/urlMIddlewares")
router.post("/",CheckURL,handlePostRequest);
router.get("/analytics/:id", handleGetRequest);
module.exports = router;