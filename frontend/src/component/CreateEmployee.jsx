import React, { useState } from 'react'
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/solid'


const CreateEmployee = () => {
    const [showModal, setShowModal] = useState(false);

    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [employeeId, setEmployeeId] = useState('')
    const [passwordVisibility, setPasswordVisibility] = useState(true)



    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Email:', email);
        console.log('Password:', password);
    };


    return (
        <>
            <div>
                <button
                    onClick={() => setShowModal(!showModal)}
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
                    + New Customer
                </button>

                {showModal && (
                    <div onClick={() => setShowModal(!showModal)} className='w-screen inset-0  bg-opacity-50 backdrop-blur-sm z-10  fixed h-screen top-0 left-0 flex items-center justify-center'>
                        <div onClick={(e) => e.stopPropagation()} className=" z-10 inset-2 border relative border-gray-300 bg-white flex flex-col gap-10 justify-between p-20 rounded-lg">
                            <XMarkIcon onClick={() => setShowModal(false)} className="h-6 w-6 text-black absolute right-10 top-10" />

                            <h1 className='font-bold text-center text-3xl'>Create Employee</h1>
                            <form onSubmit={handleSubmit} className='space-y-4 '>
                                <div className='grid grid-cols-2 gap-4'>
                                    {/* name */}
                                    <div>
                                        <label htmlFor='name' className='block text-sm font-medium'>Name</label>
                                        <input
                                            type='text'
                                            id='name'
                                            placeholder='Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className='mt-1 w-full p-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            required
                                        />
                                    </div>

                                    {/* email */}
                                    {/* <div>
                                        <label htmlFor='email' className='block text-sm font-medium'>Email</label>
                                        <input
                                            type='email'
                                            id='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='mt-1 w-full p-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            required
                                        />
                                    </div> */}

                                    {/* password */}
                                    <div>
                                        <label htmlFor='password' className='block text-sm font-medium'>Password</label>
                                        <div className='flex items-center'>
                                            <input
                                                type={passwordVisibility ? 'text' : 'password'}
                                                placeholder='Password'
                                                id='password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className='mt-1 w-full p-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                required
                                            />
                                            {/* <EyeIcon className='text-black w-6 h-10 bg-gray-100' /> */}
                                        </div>

                                    </div>

                                    {/* employeeId */}
                                    <div>
                                        <label htmlFor='employeeId' className='block text-sm font-medium'>EmpoyeeId</label>
                                        <input
                                            type='text'
                                            id='employeeId'
                                            placeholder='EmployeeId'
                                            value={employeeId}
                                            onChange={(e) => setEmployeeId(e.target.value)}
                                            className='mt-1 w-full p-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            required
                                        />
                                    </div>

                                    {/* role */}
                                    <div>
                                        <label htmlFor='role' className='block text-sm font-medium'>Role</label>
                                        <input
                                            type='text'
                                            id='role'
                                            placeholder='Role'
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className='mt-1 w-full p-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            required
                                        />
                                    </div>

                                    {/* bloodGroup */}
                                    <div>
                                        <label htmlFor='bloodGroup' className='block text-sm font-medium'>Blood Group</label>
                                        <input
                                            type='text'
                                            id='bloodGroup'
                                            placeholder='Blood Group'
                                            value={bloodGroup}
                                            onChange={(e) => setBloodGroup(e.target.value)}
                                            className='mt-1 w-full p-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            required
                                        />
                                    </div>

                                    {/* phone */}
                                    <div>
                                        <label htmlFor='phone' className='block text-sm font-medium'>phone</label>
                                        <input
                                            type='tel'
                                            id='phone'
                                            placeholder='Phone'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className='mt-1 w-full p-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            required
                                        />
                                    </div>

                                </div>


                                <button
                                    type='submit'
                                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200'
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div >
                )}
            </div >
        </>
    )
}

export default CreateEmployee