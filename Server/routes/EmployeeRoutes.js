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

router.get('/admin/getemployees', GetAllEmployees);
router.patch('/admin/updateemployee', UpdateEmployee);
router.delete('/admin/removeEmployee', removeEmployee);
router.get('/admin/getsingleemployee', GetSingleEmployee);
router.post('/admin/uploadimg', upload.single('image'), uploadmedia);

module.exports = router;

