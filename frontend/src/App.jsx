import React from 'react'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Sidebar from './component/Sidebar'
import EmployeeList from './component/EmployeeList'


function App() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/employees' element={<EmployeeList />} />

        </Routes>
      </div>
    </div>
  )
}

export default App