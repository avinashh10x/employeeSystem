import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { deleteEmployee } from '../services/EmployeeServices';

function DeleteEmployee({ id, onDelete }) {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteEmployee(id);
            onDelete(id); // Notify parent component about the deletion
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting employee:", error.message);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className=" px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
            >
                <TrashIcon className="h-6 text-white" />
            </button>
            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed top-0 left-0 w-full inset-0 bg-opacity-50 backdrop-blur-sm h-full flex justify-center items-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-col items-center space-y-4 bg-white h-1/3 w-1/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg justify-center"
                    >
                        <p className="text-2xl font-bold text-black">Delete Employee</p>
                        <p className="text-gray-600">Are you sure you want to delete this employee?</p>
                        <div className="flex justify-center space-x-2">
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeleteEmployee;