const shortid = require('shortid');
const urlModel = require("../models/urlModel");
async function handlePostRequest(req, res) {
    const body = req.body.url;
    const result = await urlModel.findOne({ OriginalURL: body });
    const allurlsBefore = await urlModel.find({});
    if (result) {
        return res.render("home", { urls: allurlsBefore });
    }
    const NewShortId = shortid.generate();
    await urlModel.create({
        ShortId: NewShortId,
        OriginalURL: body,
        visitHistory: []
    });
    const allurls = await urlModel.find({});
    res.render("home", { urls: allurls });
}

async function handleGetRequest(req, res) {
    const shortid = req.params.id;
    const result = await urlModel.findOne({ ShortId: shortid });
    if (!result) {
        return res.json({ "error": "No Url found" });
    }
    return res.json({
        TotalClicks: result.visitHistory.length,
        visitHistory: result.visitHistory
    })
}

module.exports = {
    handlePostRequest,
    handleGetRequest
};