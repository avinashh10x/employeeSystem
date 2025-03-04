const express = require('express');
const { Login, Home, Register, GetAllEmployees, UpdateEmployee, removeEmployee } = require('../contollers/EmployeeContollers')

const router = express.Router();



router.get('/', Home);
router.post('/login', Login);

router.post('/register', Register);

router.get('/getemployees', GetAllEmployees);
router.patch('/updateemployee', UpdateEmployee);
router.delete('/removeEmployee', removeEmployee );



module.exports = router;
