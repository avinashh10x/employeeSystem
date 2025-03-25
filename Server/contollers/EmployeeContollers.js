const Employee = require('../model/employeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: uploadOnCloudinary } = require('../config/cloudinary');

const SECRETKEY = process.env.SECRETKEY || 'yourSecretKey'; // Ensure env variable is set

// Home API
const Home = async (req, res) => {
    res.send('Hello, World! from employee server');
};

// Get all employees
const GetAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).sort({ _id: -1 }).select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GetSingleEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({ employeeId: req.employeeId }).select('-password');
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({
            success: true,
            message: 'fetched data successfully',
            employee
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Registration API
const Register = async (req, res) => {
    try {
        const { employeeId, name, phone, role, bloodGroup, password, gender, dob, email } = req.body;

        if (!employeeId || !name || !phone || !bloodGroup || !password || !email || !dob) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if employee already exists
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newEmployee = new Employee({
            employeeId,
            name,
            phone,
            gender,
            role,
            bloodGroup,
            dob,
            email,
            password: hashedPassword,

        });

        await newEmployee.save();

        // Convert document to object and remove password
        const employeeObj = newEmployee.toObject();
        delete employeeObj.password;

        res.status(200).json({
            success: true,
            employee: employeeObj,
            message: 'Employee registered successfully'
        });

    } catch (error) {
        console.error("Error in Register API:", error);
        res.status(500).json({ message: 'Server error while creating', error: error.message });
    }
};

// Login API
const Login = async (req, res) => {
    try {
        const { employeeId, password } = req.body;

        if (!employeeId || !password) {
            return res.status(400).json({ message: 'Incorrect Employee ID or Password. Please try again.' });
        }


        // Find employee by ID
        // const employee = await Employee.findOne({ employeeId });
        const employee = await Employee.findOne({ employeeId },);
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
            token,
            employee: {
                employeeId: employee.employeeId,
                name: employee.name,
                phone: employee.phone,
                bloodGroup: employee.bloodGroup
            }
        });

    } catch (error) {
        console.error("Error in Login API:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Employee API
const UpdateEmployee = async (req, res) => {
    try {
        const { employeeId, name, phone, role, bloodGroup, password, email, dob, city, state } = req.body;

        if (!employeeId || !name || !phone || !bloodGroup || !email || !dob || !city || !state) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        let updateData = { name, phone, role, bloodGroup, email, dob, city, state };

        if (password) {
            updateData.password = await bcrypt.hash(password, 12);
        }

        const updatedEmployee = await Employee.findOneAndUpdate(
            { employeeId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Convert document to object and remove password
        const employeeObj = updatedEmployee.toObject();
        delete employeeObj.password;

        res.status(200).json({ success: true, message: 'Employee updated successfully' });

    } catch (error) {
        console.error("Error in UpdateEmployee API:", error);
        res.status(500).json({ message: 'Server error while updating' });
    }
};


// Remove Employee API
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

        res.status(200).json({ success: true, message: 'Employee deleted successfully' });

    } catch (error) {
        console.error("Error in removeEmployee API:", error);
        res.status(500).json({ message: 'Server error while deleting' });
    }
};

const uploadmedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        if (req.file.size > 10485760) {
            return res.status(400).json({ error: "File size too large. Maximum is 5MB" });
        }

        const response = await uploadOnCloudinary(req.file.path)
        if (!response) {
            return res.status(500).json({ error: "Failed to upload to cloudinary" });
        }

        res.json({
            message: "File uploaded successfully",
            // filename: req.file.filename,
            status: true,
            cloudinaryUrl: response.url,
            // cloudinaryPublicId: response.public_id,
        });
    } catch (error) {
        res.status(500).json({ error: "Upload failed" }, error);
    }
}



module.exports = {
    Home,
    Register,
    Login,
    GetAllEmployees,
    UpdateEmployee,
    removeEmployee,
    GetSingleEmployee,
    uploadmedia,

};
