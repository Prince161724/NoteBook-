const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tag: {
        type: String
    },
    hobby: {
        type: String
    }
})
const Notes = mongoose.model('note', NoteSchema);
module.exports = Notes;
