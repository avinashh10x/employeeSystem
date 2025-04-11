const express = require('express');
const {
    Home,
    addCheckIn,
    addCheckout,
    getallAttendence0faEmployee,
    getTodaysAttendenceOfanEmployee,
    getAllAttendenceOfEveryOne,
    getTodaysAttendenceOfAllEmployee,
} = require('../contollers/AttendenceControllers');


const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // Middleware for role-based access
const router = express.Router();

router.get('/', Home);

// Routes for regular users
router.get('/getallAttendence0faEmployee', authMiddleware, getallAttendence0faEmployee);
router.get('/getTodaysAttendenceOfanEmployee', authMiddleware, getTodaysAttendenceOfanEmployee);
router.post('/checkIn', authMiddleware, addCheckIn);
router.patch('/checkout', authMiddleware, addCheckout);


// Admin routes
router.get('/admin/getallAttendence0faEmployee/:employeeId', authMiddleware, roleMiddleware('admin'), getallAttendence0faEmployee);
router.get('/admin/getTodaysAttendenceOfanEmployee/:employeeId', authMiddleware, roleMiddleware('admin'), getTodaysAttendenceOfanEmployee);
router.get('/admin/getAllAttendenceOfEveryOne', authMiddleware, roleMiddleware('admin'), getAllAttendenceOfEveryOne);
router.get('/admin/getTodaysAttendenceOfAllEmployee', authMiddleware, roleMiddleware('admin'), getTodaysAttendenceOfAllEmployee);


module.exports = router;