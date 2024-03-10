const mongoose = require('mongoose');

async function connect() {
    return mongoose.connect('mongodb://0.0.0.0:27017/Urls');
}

module.exports={connect};