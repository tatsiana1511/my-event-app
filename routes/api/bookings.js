const express = require('express');
const router = express.Router();
const bookingsCtrl = require('../../controllers/bookings');

router.post('/', bookingsCtrl.create);
router.get('/', bookingsCtrl.getUserBookings);
router.get('/booking-requests', bookingsCtrl.getBookingRequests);
router.post('/accept-booking/:id', bookingsCtrl.acceptBooking);
router.post('/reject-booking/:id', bookingsCtrl.rejectBooking);

module.exports = router;