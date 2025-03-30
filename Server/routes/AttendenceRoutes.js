const express = require('express');
const { Home, addCheckIn, addCheckout, getallAttendence } = require('../contollers/AttendenceControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();



router.get('/', Home)
router.get('/all', getallAttendence)

router.post('/checkIn', authMiddleware, addCheckIn)
router.patch('/checkout', authMiddleware, addCheckout)


module.exports = router;