const Employee = require('../model/employeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRETKEY = process.env.secretKey || 'RawatSir'

// Home API
const Home = async (req, res) => {
    res.send('Hello, World! from employee server');
};

// get all employees

const GetAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Registration API
const Register = async (req, res) => {
    try {
        const { employeeId, name, phone, role, bloodGroup, password, gender } = req.body;

        console.log("Request Body:", req.body); // Debugging

        if (!employeeId || !name || !phone || !bloodGroup || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        // Check if employee already exists
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        console.log("Employee ID is unique, proceeding...");

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log("Password hashed successfully");

        const newEmployee = new Employee({
            employeeId,
            name,
            phone,
            gender,
            role,
            bloodGroup,
            password: hashedPassword
        });

        console.log("Employee object created:", newEmployee);

        await newEmployee.save();
        console.log("Employee saved to DB successfully");

        // Generate JWT Token
        const token = jwt.sign(
            { employeeId: newEmployee.employeeId },
            SECRETKEY,
            { expiresIn: '1h' }
        );

        console.log("JWT Token generated");

        // Convert document to object and remove password
        const employeeObj = newEmployee.toObject();
        delete employeeObj.password;

        res.status(201).json({
            success: true,
            token: token,
            employee: employeeObj,
            message: 'Employee registered successfully'
        });

    } catch (error) {
        console.error("Error in Register API:", error); // Print full error
        res.status(500).json({ message: 'Server error while creating', error: error.message });
    }
};


// Login API
const Login = async (req, res) => {
    try {
        const { employeeId, password } = req.body;
        console.log(employeeId, password);
        if (!employeeId || !password) {

            return res.status(400).json({ message: 'Please provide employeeId and password' });
        }

        // Find employee by ID
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { employeeId: employee.employeeId },
            SECRETKEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            token: token,
            employee: {
                employeeId: employee.employeeId,
                name: employee.name,
                phone: employee.phone,
                bloodGroup: employee.bloodGroup
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Update Employee API
const UpdateEmployee = async (req, res) => {
    try {
        const { employeeId, name, phone, role, bloodGroup, password } = req.body;
        if (!employeeId || !name || !phone || !bloodGroup || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newEmployee = await Employee.findOneAndUpdate(
            { employeeId },
            { name, phone, role, bloodGroup, password: hashedPassword },
            { new: true, runValidators: true },
        )

        if (!newEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        // Convert document to object and remove password
        const employeeObj = newEmployee.toObject();
        delete employeeObj.password;

        res.status(201).json({ success: true, message: 'Employee updated successfully' });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating' });
    }

}

const removeEmployee = async (req, res) => {
    try {
        const { employeeId } = req.body;
        if (!employeeId) {
            return res.status(400).json({ message: 'Please provide employeeId' });
        }
        const deletedEmployee = await Employee.findOneAndDelete({ employeeId });

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(201).json({ success: true, message: 'Employee deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting' });
    }
}

module.exports = {
    Home,
    Register,
    Login,
    GetAllEmployees,
    UpdateEmployee,
    removeEmployee
};
