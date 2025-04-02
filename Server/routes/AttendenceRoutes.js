const express = require('express');
const {
    Home,
    addCheckIn,
    addCheckout,
    getallAttendence,
    getTodaysAttendence
} = require('../contollers/AttendenceControllers');


const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // Middleware for role-based access
const router = express.Router();

router.get('/', Home);

// Routes for regular users
router.get('/getallAttendence', authMiddleware, getallAttendence);
router.get('/getTodaysAttendence', authMiddleware, getTodaysAttendence);
router.post('/checkIn', authMiddleware, addCheckIn);
router.patch('/checkout', authMiddleware, addCheckout);


// Admin routes
router.get('/admin/getallAttendence/:employeeId', authMiddleware, roleMiddleware('admin'), getallAttendence);
router.get('/admin/getTodaysAttendence/:employeeId', authMiddleware, roleMiddleware('admin'), getTodaysAttendence);

module.exports = router;