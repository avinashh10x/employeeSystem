import {
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 p-5 h-screen text-white flex flex-col border-r border-gray-900 justify-between">
      <div className=" fixed h-[95%] justify-between flex flex-col">
        {/* Top section with logo and main links */}
        <div>
          <h2 className="text-2xl font-bold mb-5 text-blue-400">Novem Controls</h2>
          <ul className="flex flex-col gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-2 rounded gap-3 items-center cursor-pointer flex ${isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`
              }
            >
              <li className="flex items-center gap-3">
                <HomeIcon className="h-5" /> Dashboard
              </li>
            </NavLink>

            <NavLink
              to="/Employees"
              className={({ isActive }) =>
                `p-2 rounded gap-3 items-center cursor-pointer flex ${isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`
              }
            >
              <li className="flex items-center gap-3">
                <UserGroupIcon className="h-5" /> Employees
              </li>
            </NavLink>

            <NavLink
              to="/Attendence"
              className={({ isActive }) =>
                `p-2 rounded gap-3 items-center cursor-pointer flex ${isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`
              }
            >
              <li className="flex items-center gap-3">
                <ClipboardDocumentListIcon className="h-6" /> Attendence
              </li>
            </NavLink>

            <NavLink
              to="/Setting"
              className={({ isActive }) =>
                `p-2 rounded gap-3 items-center cursor-pointer flex ${isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`
              }
            >
              <li className="flex items-center gap-3">
                <Cog8ToothIcon className="h-6" /> Setting
              </li>
            </NavLink>
          </ul>
        </div>

        {/* Admin at bottom */}
        <div>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `p-2 rounded gap-3 items-center cursor-pointer flex ${isActive ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
              }`
            }
          >
            <li className="flex items-center gap-3">
              <UserCircleIcon className="h-5" /> Admin
            </li>
          </NavLink>
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
