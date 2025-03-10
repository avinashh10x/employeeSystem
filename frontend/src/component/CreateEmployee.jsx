import React, { useState } from 'react';
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { createEmployee } from '../services/EmployeeServices'; // Ensure this path is correct

const CreateEmployee = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeId, setEmployeeId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !phone || !role || !bloodGroup || !password || !employeeId) {
            alert("All fields are required!");
            return;
        }

        const newEmployee = { employeeId, name, phone, role, bloodGroup, password };
        const response = await createEmployee(newEmployee);

        if (response) {
            alert("Employee created successfully!");
            setShowModal(false);
            setEmployeeId('');
            setName('');
            setPhone('');
            setRole('');
            setBloodGroup('');
            setPassword('');
        } else {
            alert("Failed to create employee.");
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                + New Employee
            </button>

            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="w-screen inset-0 bg-opacity-50 backdrop-blur-sm fixed h-screen top-0 left-0 flex items-center justify-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="border border-gray-300 bg-gray-800 flex flex-col gap-10 p-10 rounded-lg relative"
                    >
                        <XMarkIcon
                            onClick={() => setShowModal(false)}
                            className="h-6 w-6 text-white absolute right-4 top-4 cursor-pointer"
                        />

                        <h1 className="font-bold text-center text-3xl text-white">Create Employee</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 w-full p-2 bg-gray-100 rounded text-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white">Employee ID</label>
                                    <input
                                        type="text"
                                        placeholder="Employee ID"
                                        value={employeeId}
                                        onChange={(e) => setEmployeeId(e.target.value)}
                                        className="mt-1 w-full p-2 bg-gray-100 rounded text-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white">Role</label>
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="mt-1 w-full p-2 bg-gray-100 rounded text-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white">Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mt-1 w-full p-2 bg-gray-100 rounded text-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white">Blood Group</label>
                                    <input
                                        type="text"
                                        placeholder="Blood Group"
                                        value={bloodGroup}
                                        onChange={(e) => setBloodGroup(e.target.value)}
                                        className="mt-1 w-full p-2 bg-gray-100 rounded text-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white">Password</label>
                                    <div className="flex items-center">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mt-1 w-full p-2 bg-gray-100 rounded text-black"
                                            required
                                        />
                                        {/* <EyeIcon className="w-6 h-6 text-gray-400 ml-2 cursor-pointer" /> */}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
                            >
                                Create Employee
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateEmployee;
