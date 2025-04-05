import React, { useEffect, useState } from 'react';
import { getAllAttendenceOfEveryOne } from '../services/EmployeeServices';

function Attendence() {
    const [attendence, setAttendence] = useState([])

    useEffect(() => {
        const fetchAttendence = async () => {
            try {

                const response = await getAllAttendenceOfEveryOne();
                console.log(response)
                setAttendence(response)

            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        }
        fetchAttendence()

    }, [])



    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold mb-4">Staff Attendance</h1>
            <table className="w-full bg-gray-800 rounded shadow">
                <thead>
                    <tr className="border-b border-white bg-gray-900 text-left">
                        <th className="border border-gray-400 px-4 py-2">Employee ID</th>
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Check-In</th>
                        <th className="border border-gray-400 px-4 py-2">Check-Out</th>
                    </tr>
                </thead>
                <tbody>
                    {attendence.map((employee) => (
                        <tr key={employee.id}
                        className="border-b border-gray-700 cursor-pointer hover:bg-gray-700"
                            
                        >
                            <td className="border border-gray-400 px-4 py-2">{employee.employeeId}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.checkIn}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.checkOut}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Attendence;