const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('events', eventSchema);