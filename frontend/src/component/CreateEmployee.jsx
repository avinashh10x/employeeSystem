import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createEmployee } from "../services/EmployeeServices"; // Ensure this path is correct

const CreateEmployee = ({ onEmployeeCreated }) => {
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

  // Handle input change
  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = await createEmployee(employeeData);
      alert("Employee created successfully!");
      setShowModal(false);
      setEmployeeData({
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
      onEmployeeCreated(newEmployee); // Notify parent component about the new employee
    } catch (error) {
      console.error("Error creating employee:", error.message);
      alert("Failed to create employee.");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className=" px-4 py-2 bg-blue-600 text-white rounded"
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
            className="border border-gray-300 bg-gray-800 flex flex-col gap-6 p-8 rounded-lg relative w-[50vw]"
          >
            <XMarkIcon
              onClick={() => setShowModal(false)}
              className="h-6 w-6 text-white absolute right-4 top-4 cursor-pointer"
            />

            <h1 className="font-bold text-center text-3xl text-white">
              Create Employee
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {[
                { label: "Name", name: "name", type: "text", placeholder: "Name" },
                {
                  label: "Employee ID",
                  name: "employeeId",
                  type: "text",
                  placeholder: "Employee ID",
                },
                { label: "Role", name: "role", type: "text", placeholder: "Role" },
                {
                  label: "Phone",
                  name: "phone",
                  type: "tel",
                  placeholder: "Phone",
                },
                {
                  label: "Blood Group",
                  name: "bloodGroup",
                  type: "text",
                  placeholder: "Blood Group",
                },
                { label: "Gender", name: "gender", type: "text", placeholder: "Gender" },
                { label: "Email", name: "email", type: "email", placeholder: "Email" },
                { label: "Date of Birth", name: "dob", type: "date" },
                { label: "Password", name: "password", type: "password" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-white">{label}</label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={employeeData[name]}
                    onChange={handleChange}
                    className="mt-1 w-full p-2 bg-gray-100 rounded text-black"
                    required
                  />
                </div>
              ))}

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
                >
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEmployee;
