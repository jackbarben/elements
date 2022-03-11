const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImprovSchema = new Schema({
    user: String,
    image: String,
    title: String,
    link: {
        url: String,
        filename: String
    },
    notes: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Improvisation', ImprovSchema);

