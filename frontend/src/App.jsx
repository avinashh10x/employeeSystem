import React from 'react'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<SignIn />} />

      </Routes>
    </div>
  )
}

export default App