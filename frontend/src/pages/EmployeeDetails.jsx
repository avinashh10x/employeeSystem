import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getAllEmployees, uploadMedia, updateEmployee } from "../services/EmployeeServices";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const EmployeeDetails = () => {
    const { employeeId } = useParams();
    const location = useLocation();
    const [employee, setEmployee] = useState(location.state?.employee || null);

    useEffect(() => {
        if (!employee) {
            const fetchEmployee = async () => {
                const employees = await getAllEmployees();
                const foundEmployee = employees.find(emp => emp.employeeId === employeeId);
                setEmployee(foundEmployee);
            };
            fetchEmployee();
        }
    }, [employee, employeeId]);

    if (!employee) {
        return <p className="text-center text-gray-300">Loading employee details...</p>;
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                // Upload the image to the backend
                const uploadResponse = await uploadMedia(formData);

                if (uploadResponse.cloudinaryUrl) {
                    // Update the employee's avatar in the backend
                    const updatedEmployee = await updateEmployee({
                        ...employee,
                        avatar: uploadResponse.cloudinaryUrl,
                    });

                    // Update the local state with the new avatar URL
                    setEmployee({ ...employee, avatar: uploadResponse.cloudinaryUrl });
                    alert("Avatar updated successfully!");
                    console.log(uploadResponse.cloudinaryUrl)
                }
            } catch (error) {
                console.error("Error uploading image:", error.message);
                alert("Failed to upload image.");
            }
        }
    };

    return (
        <div className="p-10 bg-gray-900 text-white min-h-screen flex justify-center items-center">
            <div className="bg-gray-800 text-white p-8 rounded-xl w-full max-w-4xl shadow-lg flex gap-8">
                {/* Left Section: Avatar */}
                <div className="relative flex-shrink-0 flex flex-col justify-center items-center">
                    {employee.avatar ? (
                        <img
                            src={employee.avatar}
                            alt="Avatar"
                            className="h-60 w-60 rounded-full object-cover"
                        />
                    ) : (
                        <UserCircleIcon className="h-60 text-white" />
                    )}
                    {/* Pencil Icon for Editing */}
                    <label className="absolute bottom-20 right-10 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600">
                        <PencilIcon className="h-5 w-5 text-white" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                    {/* Center the button */}
                    <div className="mt-4">
                        <button className="w-30 h-10 bg-blue-300 rounded-2xl">Update</button>
                    </div>
                </div>
                {/* Right Section: Employee Details */}

                <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-center border-b pb-4 mb-6">Employee Details</h2>
                    <div className="grid grid-cols-2 gap-6 text-lg">
                        <div><strong className="text-gray-400">Employee ID:</strong> <span className="font-medium">{employee.employeeId}</span></div>
                        <div><strong className="text-gray-400">Name:</strong> <span className="font-medium">{employee.name}</span></div>
                        <div><strong className="text-gray-400">Role:</strong> <span className="font-medium">{employee.role}</span></div>
                        <div><strong className="text-gray-400">Phone:</strong> <span className="font-medium">{employee.phone}</span></div>
                        <div><strong className="text-gray-400">Blood Group:</strong> <span className="font-medium">{employee.bloodGroup}</span></div>
                        <div><strong className="text-gray-400">Email:</strong> <span className="font-medium">{employee.email}</span></div>
                        <div><strong className="text-gray-400">Date of Birth:</strong> <span className="font-medium">{new Date(employee.dob).toLocaleDateString()}</span></div>
                        <div><strong className="text-gray-400">Gender:</strong> <span className="font-medium">{employee.gender}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
