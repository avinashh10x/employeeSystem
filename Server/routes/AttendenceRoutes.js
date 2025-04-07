const express = require('express');
const {
    Home,
    addCheckIn,
    addCheckout,
    getallAttendence0faEmployee,
    getTodaysAttendenceOfaEmployee,
    getAllAttendenceOfEveryOne,
    getTodaysAttendenceOfAllEmployee,
} = require('../contollers/AttendenceControllers');


const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // Middleware for role-based access
const router = express.Router();

router.get('/', Home);

// Routes for regular users
router.get('/getallAttendence0faEmployee', authMiddleware, getallAttendence0faEmployee);
router.get('/getTodaysAttendenceOfaEmployee', authMiddleware, getTodaysAttendenceOfaEmployee);
router.post('/checkIn', authMiddleware, addCheckIn);
router.patch('/checkout', authMiddleware, addCheckout);


// Admin routes
router.get('/admin/getallAttendence0faEmployee/:employeeId', authMiddleware, roleMiddleware('admin'), getallAttendence0faEmployee);
router.get('/admin/getTodaysAttendenceOfaEmployee/:employeeId', authMiddleware, roleMiddleware('admin'), getTodaysAttendenceOfaEmployee);
router.get('/admin/getAllAttendenceOfEveryOne', authMiddleware, roleMiddleware('admin'), getAllAttendenceOfEveryOne);
router.get('/admin/getTodaysAttendenceOfAllEmployee', authMiddleware, roleMiddleware('admin'), getTodaysAttendenceOfAllEmployee);


module.exports = router;