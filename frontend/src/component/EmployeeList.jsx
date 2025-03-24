import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../services/EmployeeServices";
import CreateEmployee from "./CreateEmployee";
import { TrashIcon } from "@heroicons/react/24/solid";
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
    return (
        <div className="p-5 bg-gray-900 text-white h-screen">
            <h2 className="text-2xl font-semibold mb-5">Employees</h2>
            <div>
                <CreateEmployee />
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
                                    {/* <td className="p-2"><TrashIcon className="h-6 text-white" /></td> */}
                                    <td className="p-2"><DeleteEmployee id={emp.employeeId} /></td>
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-2 text-center">No employees found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default EmployeeList