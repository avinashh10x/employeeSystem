const express = require('express');
const { Home, addCheckIn, addCheckout, getallAttendence, getTodaysAttendence } = require('../contollers/AttendenceControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();



router.get('/', Home)



router.get('/getallAttendence', authMiddleware, getallAttendence)

router.get('/getTodaysAttendence', authMiddleware, getTodaysAttendence)
router.post('/checkIn', authMiddleware, addCheckIn)
router.patch('/checkout', authMiddleware, addCheckout)


module.exports = router;