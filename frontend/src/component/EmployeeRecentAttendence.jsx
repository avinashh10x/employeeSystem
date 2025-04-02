import React, { useEffect } from 'react'
import { getAllAttendence } from '../services/EmployeeServices';

function EmployeeRecentAttendence() {

    useEffect(() => {

        const getAttendence = async (employeeId) => {
            try {
                const response = await getAllAttendence(employeeId);
                console.log(response)
                
            } catch (error) {
                console.error("Error fetching attendance:", error.message);
            }
        }

        getAttendence()

    },
    )


    return (
        <div>EmployeeRecentAttendence</div>
    )
}

export default EmployeeRecentAttendence