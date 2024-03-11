const express = require('express');
const urlModel = require("./models/urlModel")
const app = express();
const Port = 4001;
const path = require("path")
const cors = require("cors");
const staticRouter=require("./routers/staticRouter");
const { connect } = require("./database/connection");
const router = require("./routers/urlRouter")

//database connection handling
connect().then(() => console.log('Database connected'))
    .catch(err => console.error('Error connecting to database:', err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());
//routes
app.use("/url", router);
app.use("/",staticRouter);
app.get("/getId/:id", handleGetRequest)
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
