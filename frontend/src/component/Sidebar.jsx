import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 p-5 h-screen text-white ">
      <div className="flex items-start justify-between mb-5 flex-col fixed ">

        <h2 className="text-xl font-bold mb-5">Novem Controls</h2>
        <ul>
          {[
            "Dashboard",
            "Employees",
            "Analytics",
            "Messages",
            "Setting",
            "Help Centre"
          ].map((item, index) => (
            <li
              key={index}
              className="mb-3 p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
            >
              <Link to={`/${item.toLowerCase().replace(/ /g, "-")}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
