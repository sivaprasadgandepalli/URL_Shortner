const express = require("express")
const router = express.Router();
const urlModel = require("../models/urlModel")

router.get("/", async (req, res) => {
    const allUrls = await urlModel.find({});

    res.render('home', { urls: allUrls })
})


module.exports = router;