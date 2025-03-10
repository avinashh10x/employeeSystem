import axios from "axios";

// const API_URL = 'http://localhost:8000'
// const API_URL = 'https://employeesystem-4wri.onrender.com/api/'
const API_URL = 'https://employeesystem-4wri.onrender.com/api'

const getAllEmployees = async () => {
    try {
        const response = await axios.get(`${API_URL}/getemployees`);
        if (!response) {
            console.error("No data received from the server.");
            return [];
        }
        console.log("Employees:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error.message);
        return [];
    }
}


const createEmployee = async (employee) => {
    try {
        const response = await axios.post(`${API_URL}/register`, employee);
        if (!response) {
            console.error("No data received from the server.");
            return null;
        }
        console.log("Employee created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error.message);
        return null;
    }
}

export {
    getAllEmployees,
    createEmployee,
}

