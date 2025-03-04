import React from "react";
import CreateEmployee from "../component/CreateEmployee";

const HomePage = () => {
    
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-5">
                <h2 className="text-xl font-bold mb-5">Novem Controls</h2>
                <ul>
                    <li className="mb-3 p-2 bg-gray-700 rounded">Dashboard</li>
                    <li className="mb-3 p-2 bg-gray-700 rounded">Customers</li>
                    <li className="mb-3 p-2 bg-gray-700 rounded">Analytics</li>
                    <li className="mb-3 p-2 bg-gray-700 rounded">Messages</li>
                    <li className="mb-3 p-2 bg-gray-700 rounded">Setting</li>
                    <li className="mb-3 p-2 bg-gray-700 rounded">Help Centre</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 text-black p-5">
                <h2 className="text-2xl font-semibold mb-5">Customers' List</h2>
                <CreateEmployee />
                <table className="w-full bg-white rounded shadow">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">#</th>
                            <th className="p-2">Full Name</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">E-Mail</th>
                            <th className="p-2">Date of Birth</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(6)].map((_, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">Name {index + 1}</td>
                                <td className="p-2">Approved</td>
                                <td className="p-2">email{index + 1}@mail.com</td>
                                <td className="p-2">01/01/1990</td>
                                <td className="p-2 flex space-x-2">
                                    <button className="px-2 py-1 bg-gray-300 rounded">✏️</button>
                                    <button className="px-2 py-1 bg-red-500 text-white rounded">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomePage;
