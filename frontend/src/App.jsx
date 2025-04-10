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

function App() {
  const location = useLocation();

  // Define routes where the Sidebar should not be visible
  const noSidebarRoutes = ['/signup', '/signin'];

  return (
    <div className="flex bg-gray-800"> 
      {/* Conditionally render Sidebar */}
      {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="w-full">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>

          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/attendence" element={<Attendence />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/employeesdetails/:employeeId" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;