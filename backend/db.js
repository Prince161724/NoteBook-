const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://princekumargiri50:Prince%40123@cluster0.xdlo603.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0";


const connecttoMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
    } catch (error) {
        
    }
};

module.exports = connecttoMongo;
