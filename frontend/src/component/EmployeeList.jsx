import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../services/EmployeeServices";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleRowClick = (employee) => {
        // Navigate to the EmployeeDetails route with the employee ID
        navigate(`/employeesdetails/${employee.employeeId}`, { state: { employee } });
    };

    return (
        <div className="p-7 bg-gray-900 text-white min-h-screen">
            <div className=" flex justify-between items-center mb-5">
                <div className="">
                    <h2 className="text-3xl font-semibold">Staff Management</h2>
                    <p className="text-gray-600">Manage employee information and records</p>
                </div>
                <CreateEmployee onEmployeeCreated={handleEmployeeCreated} />
            </div>
            <div className="p-4 border rounded-2xl border-gray-700">

                <div className="mb-5 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold">Employees</h2>
                        <p className="text-gray-600">View and manage all staff members</p>
                    </div>
                    <div className="flex border border-gray-600 p-2 rounded ">
                        <MagnifyingGlassIcon className="h-6 mx-2 text-gray-400" />
                        <input type="text" placeholder="Search Employees..." className="w-2xl focus:outline-0 placeholder:text-gray-700" />
                    </div>

                </div>


                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="border border-gray-800 shadow !rounded-xl">
                        <table className="w-full shadow px-5 ">
                            <thead className="rounded-2xl">
                                <tr className="border-b border-gray-800 text-left  rounded-2xl">
                                    <th className="p-4">#</th>
                                    <th className="p-4"> ID</th>
                                    <th className="p-4">Full Name</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Created At</th>
                                    {/* <th className="p-4">DOB</th> */}
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 ? (
                                    employees.map((emp, index) => (
                                        <tr
                                            key={emp.employeeId}
                                            className=" text-gray-300 border-gray-800 cursor-pointer hover:bg-gray-800"
                                            onClick={() => handleRowClick(emp)}
                                        >
                                            <td className="p-4">{index + 1}</td>
                                            <td className="p-4">{emp.employeeId}</td>
                                            <td className="p-4">{emp.name}</td>
                                            <td className="p-4">{emp.role}</td>
                                            <td className="p-4">{emp.phone}</td>
                                            <td className="p-4">{emp.email}</td>
                                            <td className="p-4">{new Date(emp.createdAt).toLocaleString()}</td>
                                            {/* <td className="p-4">{new Date(emp.dob).toLocaleDateString()}</td> */}
                                            <td onClick={(e) => e.stopPropagation()} className="p-2 flex justify-center !items-center space-x-2">
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
                    </div>

                )}
            </div>

        </div>
    );
}

export default EmployeeList;