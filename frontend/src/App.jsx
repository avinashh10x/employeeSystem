import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Sidebar from './component/Sidebar';
import EmployeeList from './component/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import ProtectedRoute from './component/ProtectedRoute';
import Attendence from './pages/Attendence';
import Setting from './pages/Setting';
import { Toaster } from 'react-hot-toast';
import Admin from './pages/Admin';

function App() {
  const location = useLocation();
  const noSidebarRoutes = ['/signup', '/signin'];

  return (
    <div className="flex bg-gray-800">
      {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="w-full">
        <Routes>
          {/* Grouped protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/attendence" element={<Attendence />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/employeesdetails/:employeeId" element={<EmployeeDetails />} />
            <Route path='/admin' element={<Admin />} />
          </Route>

          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
