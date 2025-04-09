import React, { useEffect, useState } from 'react';
import { getTodaysAttendenceOfAllEmployee } from '../services/EmployeeServices';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

const data = [
    { name: 'Present', value: 28, fill: '#22c55e' },   // green-500
    { name: 'Absent', value: 8, fill: '#ef4444' },     // red-500
    { name: 'Late', value: 2, fill: '#facc15' },       // yellow-500
    { name: 'Half Day', value: 2, fill: '#3b82f6' },   // blue-500
];


function Attendence() {
    const [attendence, setAttendence] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchAttendence = async () => {
            try {
                const response = await getTodaysAttendenceOfAllEmployee();
                console.log(response);
                setAttendence(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching attendance:", error);
                setLoading(false);
            }
        };
        fetchAttendence();
    }, [
        attendence
    ]);

    const handleRowClick = (employee) => {
        // Navigate to the EmployeeDetails route with the employee ID
        navigate(`/employeesdetails/${employee.employeeId}`, { state: { employee } });
    };

    return (
        <div className="p-7 bg-gray-900 text-white min-h-screen">
            <div className=" flex justify-between items-center mb-5">
                <div className="">
                    <h2 className="text-3xl font-semibold">Attendance Management</h2>
                    <p className="text-gray-600">Track and manage employee attendance records</p>
                </div>
                {/* <CreateEmployee onEmployeeCreated={handleEmployeeCreated} /> */}
            </div>

            <div className="grid grid-cols-5 gap-4 mb-5">
                <div className="flex flex-col justify-evenly gap-5 col-span-3 items-start border border-gray-700 h-52 rounded-2xl p-5 mb-5 bg-gray-900">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">Today’s Attendance Overview</h2>
                        <p className="text-gray-600">Track attendance status of all Staff</p>
                    </div>

                    <div className='flex gap-5'>
                        <div className='h-24 w-40 rounded-md border pl-3 flex flex-col justify-center border-green-600 bg-green-600/10 hover:bg-green-600/20'>
                            <h3 className='text-green-500 font-medium'>Present</h3>
                            <p className='text-white text-2xl font-bold'>28</p>
                            <p className='text-sm text-gray-400'>70%</p>
                        </div>

                        <div className='h-24 w-40 rounded-md border pl-3 flex flex-col justify-center border-red-600 bg-red-600/10 hover:bg-red-600/20'>
                            <h3 className='text-red-500 font-medium'>Absent</h3>
                            <p className='text-white text-2xl font-bold'>8</p>
                            <p className='text-sm text-gray-400'>20%</p>
                        </div>

                        <div className='h-24 w-40 rounded-md border pl-3 flex flex-col justify-center border-yellow-600 bg-yellow-600/10 hover:bg-yellow-600/20'>
                            <h3 className='text-yellow-500 font-medium'>Late</h3>
                            <p className='text-white text-2xl font-bold'>2</p>
                            <p className='text-sm text-gray-400'>5%</p>
                        </div>

                        <div className='h-24 w-40 rounded-md border pl-3 flex flex-col justify-center border-blue-600 bg-blue-600/10 hover:bg-blue-600/20'>
                            <h3 className='text-blue-500 font-medium'>Half Day</h3>
                            <p className='text-white text-2xl font-bold'>2</p>
                            <p className='text-sm text-gray-400'>5%</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center col-span-2 border border-gray-700 rounded-2xl p-5 mb-5 bg-gray-900 h-52">
                    {/* Pie Chart */}
                    <div className="w-1/2 flex justify-center">
                        <PieChart width={200} height={200}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                isAnimationActive={true}
                                animationDuration={1000}
                                animationEasing="ease-out"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>

                    {/* Summary Legend */}
                    <div className="w-1/2 flex flex-col gap-2 text-sm text-white">
                        {data.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <span
                                        className="inline-block w-3 h-3 rounded-full"
                                        style={{ backgroundColor: entry.fill }}
                                    ></span>
                                    {entry.name}
                                </span>
                                <span className="font-semibold">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>



            <div className="p-4 border rounded-2xl border-gray-700">

                <div className="mb-5 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold">Attendance Summary</h2>
                        <p className="text-gray-600">View who&apos;s present Today</p>
                    </div>
                    <div className="flex border border-gray-600 p-2 rounded hover:border hover:border-blue-600">
                        <MagnifyingGlassIcon className="h-6 mx-2 text-gray-400" />
                        <input type="text" placeholder="Search Employees..." className="w-2xl focus:outline-0 placeholder:text-gray-700 " />
                    </div>

                </div>



                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="border border-gray-800 shadow rounded-xl">
                        <table className="w-full shadow px-5">
                            <thead className="rounded-2xl">
                                <tr className="border-b border-gray-800 text-left rounded-2xl">
                                    <th className="p-4">#</th>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Status</th>
                                    {/* <th className="p-4">URL</th> */}
                                    <th className="p-4">Check-In</th>
                                    <th className="p-4">Check-Out</th>
                                    {/* <th className="p-4">Created At</th> */}
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendence.length > 0 ? (
                                    attendence.map((emp, index) => (
                                        <tr
                                            key={emp._id}
                                            onClick={() => handleRowClick(emp)}
                                            className="text-gray-300 border-gray-800 cursor-pointer hover:bg-gray-800"
                                        >
                                            <td className="p-4">{index + 1}</td>
                                            <td className="p-4">{emp.employeeId}</td>
                                            <td className="p-4">{emp.name ? emp.name : 'NA'}</td>
                                            <td className="p-4">{emp.location}</td>
                                            <td className="p-4">{emp.checkIn ? "Present" : "Absent"}</td>
                                            {/* <td className="p-4">{emp.url}</td> */}
                                            <td className="p-4">
                                                {emp.checkIn ? new Date(emp.checkIn).toLocaleTimeString() : "—"}
                                            </td>
                                            <td className="p-4">
                                                {emp.checkOut ? new Date(emp.checkOut).toLocaleTimeString() : "—"}
                                            </td>
                                            {/* <td className="p-4">
                                                {emp.createdAt ? new Date(emp.createdAt).toLocaleString() : "—"}
                                            </td> */}
                                            <td className="p-4">
                                                <button className="text-blue-400 hover:underline">View</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="p-2 text-center">
                                            No check-ins found
                                        </td>
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

export default Attendence;