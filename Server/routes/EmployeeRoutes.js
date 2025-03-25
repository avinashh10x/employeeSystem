const express = require('express');
const { Login,
    Home,
    Register,
    GetAllEmployees,
    UpdateEmployee,
    removeEmployee,
    GetSingleEmployee,
    uploadmedia
} = require('../contollers/EmployeeContollers')

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { default: upload } = require('../middleware/multer.middleware');



router.get('/', Home);
router.post('/login', Login);
router.post('/register', Register);
router.get('/getemployees', GetAllEmployees);
router.patch('/updateemployee', authMiddleware, UpdateEmployee);
router.delete('/removeEmployee', removeEmployee);
router.get('/getsingleemployee', authMiddleware, GetSingleEmployee);
router.post('/uploadimg', authMiddleware, upload.single("image"), uploadmedia)



module.exports = router;
