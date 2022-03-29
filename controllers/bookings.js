const Booking = require('../models/booking');
const Experience = require('../models/experience');


module.exports = {
    create,
    getUserBookings,
    getBookingRequests,
};

async function create(req, res) {
    try {
        const booking = await Booking.create({
            user: req.user._id,
            experience: req.body.experienceId,
            fullName: req.body.fullName,
            eventName: req.body.eventName,
            eventLocation: req.body.eventLocation,
            numberOfPeople: req.body.numberOfPeople,
            durationOfExperience: req.body.durationOfExperience,
            eventDescription: req.body.eventDescription,
            eventDate: req.body.eventDate,
        });
        res.status(200).json(booking);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getUserBookings(req, res) {
    try {
        const bookings = await Booking.find({ user: req.user._id }).exec();
        res.status(200).json(bookings);
    } catch(err) {
        res.status(400).json(err);
    }
}

async function getBookingRequests(req, res) {
    try {
        const experience = await Experience.findOne({ user: req.user._id }).exec();
        const bookingRequests = await Booking.find({ experience: experience._id }).exec();
        res.status(200).json(bookingRequests);
    } catch(err) {
        res.status(400).json(err);
    }
}