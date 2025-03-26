import { PencilIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import { updateEmployee } from "../services/EmployeeServices";

function EditEmployee({ data }) {
    const [showModal, setShowModal] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        employeeId: "",
        name: "",
        phone: "",
        role: "",
        bloodGroup: "",
        password: "",
        email: "",
        dob: "",
        gender: "",
    });

    useEffect(() => {
        if (data) {
            setEmployeeData({
                ...data,
                dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : "" // Format DOB as YYYY-MM-DD
            });
        }
    }, [data]);


    const handleChange = (e) => {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { employeeId, name, phone, role, bloodGroup, password, email, dob, gender } = employeeData;

        if (!name || !phone || !role || !bloodGroup || !password || !employeeId || !dob || !email || !gender) {
            alert("All fields are required!");
            return;
        }

        if (!["male", "female"].includes(gender.toLowerCase())) {
            alert("Gender must be either 'male' or 'female'");
            return;
        }

        const response = await updateEmployee(employeeData);

        if (response) {
            alert("Employee updated successfully!");
            setShowModal(false);
        } else {
            alert("Failed to update employee.");
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                <PencilIcon className="h-6 text-white" />
            </button>
            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed top-0 left-0 w-full h-full inset-0 bg-opacity-50 backdrop-blur-sm  flex justify-center items-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex w-[50vw] h-[80vh] flex-col items-center space-y-6 border-1  border-amber-50 bg-gray-900 text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-lg"
                    >
                        <h1 className="text-2xl font-bold">Update Employee&apos;s Details</h1>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 w-full">
                            {[
                                { label: "Name", name: "name", type: "text", placeholder: "Name" },
                                { label: "Employee ID", name: "employeeId", type: "text", placeholder: "Employee ID", disabled: true },
                                { label: "Role", name: "role", type: "text", placeholder: "Role" },
                                { label: "Phone", name: "phone", type: "tel", placeholder: "Phone" },
                                { label: "Blood Group", name: "bloodGroup", type: "text", placeholder: "Blood Group" },
                                { label: "Gender", name: "gender", type: "text", placeholder: "Gender" },
                                { label: "Email", name: "email", type: "email", placeholder: "Email" },
                                { label: "Date of Birth", name: "dob", type: "date" },
                                { label: "Password", name: "password", type: "password" },
                            ].map(({ label, name, type, placeholder, disabled }) => (
                                <div key={name}>
                                    <label className="block text-sm font-medium text-gray-300">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        value={employeeData[name] || ''}

                                        onChange={handleChange}
                                        className={`mt-1 w-full p-2 bg-gray-800 text-white border border-gray-600 rounded 
        ${name === "employeeId" ? "cursor-not-allowed" : "cursor-text"}`}
                                        required
                                        disabled={disabled}
                                    />
                                </div>
                            ))}


                            <div className="col-span-2">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 rounded transition duration-200"
                                    onClick={()=>console.log('l')}
                                >
                                    Update Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditEmployee;