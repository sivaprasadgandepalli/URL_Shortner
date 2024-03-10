const shortid = require('shortid');
const urlModel = require("../models/urlModel");
async function handlePostRequest(req, res) {
    const body=req.body.url;
    const result = await urlModel.findOne({ OriginalURL:body});
    const NewShortId = shortid.generate();
    await urlModel.create({
        ShortId: NewShortId,
        OriginalURL: body,
        visitHistory: []
    });
    return res.status(201).json({ NewShortId, body });
}

async function handleGetRequest(req,res){
    const shortid=req.params.id;
    const result = await urlModel.findOne({ ShortId: shortid });
    if (!result) {
        return res.json({ "error": "No Url found" });
    }
    return res.json({
        TotalClicks:result.visitHistory.length,
        visitHistory:result.visitHistory
    })
}

module.exports = {
    handlePostRequest,
    handleGetRequest
};