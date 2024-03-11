const CheckURL=(req,res,next)=>{
    const body = req.body.url;
    if (!body) {
        console.log(req.body)
        return res.status(400).json({ "error": "Url is required" })
    }
    next();
}

module.exports={
    CheckURL
}