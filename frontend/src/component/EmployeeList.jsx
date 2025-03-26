import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../services/EmployeeServices";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await getAllEmployees();
            setEmployees(data);
            setLoading(false);
        };
        fetchEmployees();
    }, []);

    const handleEmployeeDeleted = (deletedEmployeeId) => {
        const updatedEmployees = employees.filter(emp => emp.employeeId !== deletedEmployeeId);
        setEmployees(updatedEmployees); // Update the list after deletion
    };

    const handleEmployeeCreated = (newEmployee) => {
        setEmployees([newEmployee, ...employees]); // Add the new employee to the top of the list
    };

    return (
        <div className="p-5 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-5">Employees</h2>
            <div>
                <CreateEmployee onEmployeeCreated={handleEmployeeCreated} />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full bg-gray-800 rounded shadow">
                    <thead>
                        <tr className="border-b border-white bg-gray-900 text-left">
                            <th className="p-2">#</th>
                            <th className="p-2">Employee ID</th>
                            <th className="p-2">Full Name</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Blood Group</th>
                            <th className="p-2">Created At</th>
                            <th className="p-2">DOB</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((emp, index) => (
                                <tr key={emp.employeeId} className="border-b border-gray-700">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{emp.employeeId}</td>
                                    <td className="p-2">{emp.name}</td>
                                    <td className="p-2">{emp.role}</td>
                                    <td className="p-2">{emp.phone}</td>
                                    <td className="p-2">{emp.bloodGroup}</td>
                                    <td className="p-2">{new Date(emp.createdAt).toLocaleString()}</td>
                                    <td className="p-2">{new Date(emp.dob).toLocaleDateString()}</td>
                                    <td className="p-2 flex space-x-2">
                                        <DeleteEmployee
                                            id={emp.employeeId}
                                            onDelete={handleEmployeeDeleted}
                                        />
                                        <EditEmployee data={emp} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="p-2 text-center">No employees found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeeList;