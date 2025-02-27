import { useEffect, useState } from 'react';
import { getAllEmployees } from '../services/EmployeeServices';

function HomePage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await getAllEmployees();
            setEmployees(data);
        };

        fetchEmployees();
    }, []);

    console.log(employees, "Employees from home page");

    return (
        <div>
            <h1>Employees</h1>
            <ul>
                {employees.map((emp) => (
                    <li key={emp._id}>{emp.name} - {emp.role}</li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
