const express = require('express');
const router = express.Router();
const bookingsCtrl = require('../../controllers/bookings');

router.post('/', bookingsCtrl.create);
router.get('/', bookingsCtrl.getUserBookings)
router.get('/booking-requests', bookingsCtrl.getBookingRequests)

module.exports = router;