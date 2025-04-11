import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uploadMedia, updateEmployee, getAllDataOfaEmployee } from "../services/EmployeeServices";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import toast from "react-hot-toast";


const EmployeeDetails = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);

    const data = [
        { name: 'Present', value: 28, fill: '#22c55e' },   // green-500
        { name: 'Absent', value: 8, fill: '#ef4444' },     // red-500
        { name: 'Late', value: 2, fill: '#facc15' },       // yellow-500
        { name: 'Half Day', value: 2, fill: '#3b82f6' },   // blue-500
    ];


    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await getAllDataOfaEmployee(employeeId);
                setEmployee(response);
                console.log(response);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch employee data", error);
                setLoading(false);
                toast.error("Failed to fetch employee data")
            }
        };

        fetchEmployee();
    }, [employeeId]);

    const handleImageChange = async (event) => {

        const file = event.target.files[0];
        if (file) {

            const formData = new FormData();
            formData.append("image", file);


            try {
                const uploadResponse = await uploadMedia(formData);
                if (uploadResponse.cloudinaryUrl) {
                    const updated = await updateEmployee({
                        ...employee,
                        avatar: uploadResponse.cloudinaryUrl,
                    });


                    setEmployee(updated.employee);


                    toast.success("Employee Avatar Updated successfully")


                }
            } catch (error) {
                console.error("Image upload failed:", error);
                toast.error("Upload failed")
            }
        }
    };




    if (!employee) return <p className="text-center ">Loading employee details...</p>;

    return (
        <div className="p-6 min-h-screen text-white  ">
            <div className="">
                <h2 className="text-3xl font-semibold">Employee Details</h2>
                <p className="text-gray-600">Track and manage attendance records</p>
            </div>
            <div className=" rounded-xl  border h-90  border-gray-600 shadow-md p-6 w-full mx-auto">

                <div className="grid  grid-cols-7 gap-6 h-full">
                    {/* Avatar Section */}
                    <div className="col-span-2 flex  flex-col items-center">
                        {employee.employee.avatar ? (
                            <img
                                src={employee.employee.avatar}
                                alt="Avatar"
                                className="h-50 w-50 rounded-full border-4 border-blue-400 object-cover border"
                            />
                        ) : (
                            <UserCircleIcon className="h-50 w-50 " />
                        )}
                        <label className="mt-3 cursor-pointer text-sm text-blue-700  hover:underline">
                            Change Avatar
                            <input type="file" className="hidden" onChange={handleImageChange} />
                        </label>
                        <div className="text-center mt-4">
                            <h3 className="text-3xl font-bold">{employee.employee.name}</h3>
                            <p className="">{employee.employee.role}</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="col-span-2 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className=" text-sm">Email</p>
                                <p className="font-medium">{employee.employee.email || "example@gmail.com"}</p>
                            </div>
                            <div>
                                <p className=" text-sm" >Phone Number</p>
                                <p className="font-medium">{employee.employee.phone || "+1234567890"}</p>
                            </div>
                            <div className="col-span-2">
                                <p className=" text-sm">Address</p>
                                <p className="font-medium">{employee.employee.address || "7026 Main St"}</p>
                            </div>
                        </div>

                        <div className="border-t pt-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className=" text-sm">Department</p>
                                <p className="font-medium">{employee.employee.department || "Operations"}</p>
                            </div>
                            <div>
                                <p className=" text-sm">Employee ID</p>
                                <p className="font-medium">{employee.employee.employeeId || "EMP-1002"}</p>
                            </div>
                            <div>
                                <p className=" text-sm">Joining Date</p>
                                <p className="font-medium">
                                    {new Date(employee.employee.joiningDate || "2021-11-04").toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className=" text-sm">Base Salary</p>
                                <p className="font-medium">${employee.employee.baseSalary || "90,000"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 border border-gray-600 rounded-xl p-6 flex items-center gap-6">
                        {/* Graph Section */}
                        {/* <h2>Proformance Graph</h2> */}
                        <div className="flex-1 flex justify-center">
                            <PieChart width={250} height={250}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
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

                        {/* Legend / Details Section */}
                        <div className="flex-1 space-y-2 text-sm">
                            {data.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="flex items-center gap-2">
                                        <span
                                            className="inline-block w-4 h-4 rounded-full"
                                            style={{ backgroundColor: item.fill }}
                                        ></span>
                                        {item.name}
                                    </span>
                                    <span className="font-semibold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Attendance Records</h2>
                <p className="text-gray-600">View and manage attendance records</p>
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="border border-gray-500 shadow rounded-xl">
                            <table className="w-full shadow px-5">
                                <thead className="rounded-2xl">
                                    <tr className="border-b border-gray-500 text-left rounded-2xl">
                                        <th className="p-4">#</th>
                                        <th className="p-4">ID</th>
                                        {/* <th className="p-4">Name</th> */}
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
                                    {employee.attendence.length > 0 ? (
                                        employee.attendence.map((emp, index) => (
                                            <tr
                                                key={emp._id}
                                                className="text-gray-300 border-gray-800 cursor-pointer hover:bg-gray-800">
                                                <td className="p-4">{index + 1}</td>
                                                <td className="p-4">{emp.employeeId}</td>
                                                {/* <td className="p-4">{emp.name ? emp.name : 'NA'}</td> */}
                                                <td className="p-4">{emp.location}</td>
                                                <td className="p-4">{emp.checkIn ? "Present" : "Absent"}</td>
                                                {/* <td className="p-4">{emp.url}</td> */}
                                                <td className="p-4">
                                                    {emp.checkIn ? new Date(emp.checkIn).toLocaleString() : "—"}
                                                </td>
                                                <td className="p-4">
                                                    {emp.checkOut ? new Date(emp.checkOut).toLocaleString() : "—"}
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

        </div>
    );
};

export default EmployeeDetails;
