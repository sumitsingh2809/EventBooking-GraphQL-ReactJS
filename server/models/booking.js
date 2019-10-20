const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    event: {
        type: mongoose.Types.ObjectId,
        ref: 'events'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

module.exports = mongoose.model('bookings', bookingSchema);