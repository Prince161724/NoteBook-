const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/";

const connecttoMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
    } catch (error) {
        
    }
};

module.exports = connecttoMongo;
