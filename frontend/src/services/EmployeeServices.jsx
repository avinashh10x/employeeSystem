import axios from "axios";

// Base API URL
// const API_URL = 'https://employeesystem-4wri.onrender.com/api';
const API_URL = 'http://localhost:8000/api';

// Fetch all employees
const getAllEmployees = async () => {
    try {
        const response = await axios.get(`${API_URL}/getemployees`);
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error.message);
        return [];
    }
}

// Register a new employee
const createEmployee = async (employee) => {
    try {
        const response = await axios.post(`${API_URL}/register`, employee);
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error.message);
        throw error;
    }
}

// Login employee
const loginEmployee = async (employeeId, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { employeeId, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
}

// Update employee details
const updateEmployee = async (employee) => {
    try {
        const response = await axios.put(`${API_URL}/updateemployee`, employee);
        return response.data;
    } catch (error) {
        console.error("Error updating employee:", error.message);
        throw error;
    }
}

// Delete an employee
const deleteEmployee = async (employeeId) => {
    try {
        const response = await axios.delete(`${API_URL}/removeemployee`, {
            data: { employeeId } // Sending employeeId in the request body
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting employee:", error.message);
        throw error;
    }
}

// Logout API (assuming a token-based authentication)
const logoutEmployee = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`);
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error.message);
        throw error;
    }
}

export {
    getAllEmployees,
    createEmployee,
    loginEmployee,
    updateEmployee,
    deleteEmployee,
    logoutEmployee
};
