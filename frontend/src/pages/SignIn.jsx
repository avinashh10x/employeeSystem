import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginEmployee } from "../services/EmployeeServices";

const SignIn = () => {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginEmployee(Id, password)
      console.log(Id, password)
      if (!response) {
        console.log('Login failed')
        return
      }
      console.log(response.data)
     
      navigate('/dashboard');
    } catch (error) {
      console.error("Error logging in:", error.message);
    }


  };



  return (
    <div className='h-screen flex items-center justify-center bg-gray-900 text-white'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-96'>
        <div className='flex justify-center mb-4'>
          <img src='https://novemcontrols.com/wp-content/uploads/2024/02/novem_controls-removebg-preview.png' alt='Logo' className='h-20' />
        </div>
        <h2 className='text-2xl font-bold text-center mb-6'>Sign In</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='Id' className='block text-sm font-medium'>Id</label>
            <input
              type='Id'
              id='Id'
              value={Id}
              onChange={(e) => setId(e.target.value)}
              className='mt-1 w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          {/* <div className='flex items-center'>
            <input type='checkbox' id='keep-logged-in' className='mr-2' />
            <label htmlFor='keep-logged-in' className='text-sm'>Keep me logged in</label>
          </div> */}
          <button
            type='submit'
            onClick={handleSubmit}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200'
          >
            Sign In
          </button>
        </form>
        <p className='text-sm text-center mt-4'>
          <Link to={'/signup'} className='text-blue-400 hover:underline'>dont have account? SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
