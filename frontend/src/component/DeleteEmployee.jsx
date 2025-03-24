import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'
import { deleteEmployee } from '../services/EmployeeServices';

function DeleteEmployee({ id }) {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await deleteEmployee(id);
            if(!response){
                console.log("error while deleting employee")
            }
            console.log(response)
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting employee:", error.message);
            throw error;
        }
    }

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                <TrashIcon className="h-6 text-white" />
            </button>
            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed top-0 left-0 w-full inset-0 bg-opacity-50 backdrop-blur-sm h-full bg-opacity-50 flex justify-center items-center">
                    <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center space-y-4 bg-white h-1/3 w-1/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg  justify-center'>
                        <p className="text-5xl font-bold text-black">Delete Employee</p>
                        <p className="text-gray-600">Are you sure you want to delete this employee?</p>
                        <div className="flex justify-center space-x-2">
                            <button onClick={()=>handleDelete()} className="px-4 py-2 bg-red-600 text-white rounded">Yes</button>
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 rounded">No</button>
                            {/* <button className="px-4 py-2 text-gray-600 rounded">Cancel</button> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteEmployee