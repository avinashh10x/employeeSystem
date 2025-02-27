const express = require('express');
const { Login, Home, Register , GetAllEmployees} = require('../contollers/EmployeeContollers')

const router = express.Router();



router.get('/', Home);
router.post('/login', Login);

router.post('/register', Register);

router.get('/getemployees', GetAllEmployees);



module.exports = router;
