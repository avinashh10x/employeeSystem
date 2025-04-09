const express = require('express');
const {
    Login,
    Home,
    Register,
    GetAllEmployees,
    UpdateEmployee,
    removeEmployee,
    GetSingleEmployee,
    uploadmedia,
    logout,
    createEmployee
} = require('../contollers/EmployeeContollers');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/multer.middleware').default;

router.get('/', Home);


router.post('/login', Login);
router.post('/register', Register);
router.patch('/updateemployee', authMiddleware, UpdateEmployee);
router.patch('/createemployee', authMiddleware, createEmployee);

router.delete('/removeEmployee', authMiddleware, removeEmployee);

router.get('/getsingleemployee', authMiddleware, GetSingleEmployee);
router.get('/logout', authMiddleware, logout);
router.post('/uploadimg', upload.single('image'), uploadmedia);

router.get('/admin/getemployees', authMiddleware, roleMiddleware('admin'), GetAllEmployees);
router.get('/admin/getsingleemployee/:employeeId', authMiddleware, roleMiddleware('admin'), GetSingleEmployee);
router.patch('/admin/updateemployee', authMiddleware, roleMiddleware('admin'), UpdateEmployee);
router.delete('/admin/removeEmployee', authMiddleware, roleMiddleware('admin'), removeEmployee);
router.get('/admin/getsingleemployee', authMiddleware, roleMiddleware('admin'), GetSingleEmployee);
router.post('/admin/uploadimg', upload.single('image'), authMiddleware, roleMiddleware('admin'), uploadmedia);

module.exports = router;