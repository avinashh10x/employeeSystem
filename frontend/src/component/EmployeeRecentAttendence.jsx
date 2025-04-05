import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getallAttendence0faEmployee } from '../services/EmployeeServices';

function EmployeeRecentAttendence() {
    const { employeeId } = useParams()
    const [attendence, setAttendence] = useState([])



    useEffect(() => {

        const getAttendence = async () => {
            try {
                const response = await getallAttendence0faEmployee(employeeId);
                console.log(employeeId)
                setAttendence(response);

            } catch (error) {
                console.error("Error fetching attendance:", error.message);
            }
        }

        getAttendence()

    }, [employeeId])


    return (
        <>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl text-gray-300'>Recent Attendence</h1>
                <table className='w-full text-left table-auto'>
                    <thead>
                        <tr className='border-b border-gray-600'>
                            <th className='py-2 px-4'>EmployeeId</th>
                            <th className='py-2 px-4'>CheckIn</th>
                            <th className='py-2 px-4'>CheckOut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendence.map((attend, _id) => (
                            <tr key={_id} className='border-b 
                            border-gray-600'>
                                <td className='py-2 px-4'>{attend.employeeId}</td>
                                <td className='py-2 px-4'>{new Date(attend.checkIn).toLocaleTimeString()}</td>
                                <td className='py-2 px-4'>{new Date(attend.checkOut).toLocaleTimeString() || "NA"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EmployeeRecentAttendence