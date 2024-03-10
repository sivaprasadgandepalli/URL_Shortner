const express = require('express');
const urlModel = require("./models/urlModel")
const app = express();
const Port = 4001;
const { connect } = require("./database/connection");
const router = require("./routers/urlRouter")

//database connection handling
connect().then(() => console.log('Database connected'))
    .catch(err => console.error('Error connecting to database:', err));

//middleware
app.use(express.json());

//routes
app.use("/url", router);
app.get("/:id", handleGetRequest)

async function handleGetRequest(req, res) {
    const id = req.params.id;
    try {
        const result = await urlModel.findOne({ ShortId: id });
        if (!result) {
            return res.json({ "error": "No Url found" });
        }
        
        await urlModel.findOneAndUpdate(
            { ShortId: id },
            {
                $push:
                {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        return res.redirect(result.OriginalURL);
    } catch (error) {
        console.error("Error updating visit history:", error);
        return res.status(500).json({ "error": "Internal Server Error" });
    }
}


//listening to the port
app.listen(Port, () => {
    console.log('Server is running at port: ' + Port);
})
