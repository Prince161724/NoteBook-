const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    }
})
const User = mongoose.model('user', UserSchema);
module.exports = User;