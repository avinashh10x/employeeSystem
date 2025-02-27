const mongoose = require('mongoose');

// Define the schema for employee details
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // email: {
    //     type: String,
    //     required: true
    // },
    // salary: {
    //     type: Number,
    //     required: true
    // }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;


// "employeeId": "EMP002",
// "name": "Alice Smith",
// "role": "HR Manager",
// "phone": "9123456789",
// "bloodGroup": "A-",
// "password": "Alice@123"