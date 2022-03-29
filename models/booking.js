const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    fullName: {type: String, required: true},
    eventName: {type: String, required: true},
    eventLocation: {type: String, required: true},
    numberOfPeople: {type: Number, required: true},
    durationOfExperience: {type: Number, required: true},
    eventDescription: {type: String, required: true},
    eventDate: {type: Date, required: true},
    status: { type: String, required: true, default: 'Pending acceptance' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    experience: { type: Schema.Types.ObjectId, ref: 'Experience' },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Booking', bookingSchema);
