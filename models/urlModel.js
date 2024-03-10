const mongoose=require('mongoose');
const UrlSchema=new mongoose.Schema({
    ShortId:{
        type:String,
        required:true,
        unique:true
    },
    OriginalURL:{
        type:String,
        required:true,
    },
    visitHistory:[
        {
            timestamp:{
                type:Number
            }
        }
    ]
},{timestamps:true});

module.exports=mongoose.model('URL_Models',UrlSchema);