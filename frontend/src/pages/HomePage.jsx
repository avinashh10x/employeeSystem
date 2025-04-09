import { UserGroupIcon, BookmarkIcon, HeartIcon } from "@heroicons/react/24/solid";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const userData = [
  { month: "Jan", users: 8 },
  { month: "Feb", users: 16 },
  { month: "Mar", users: 28 },
  { month: "Apr", users: 18 },
  { month: "May", users: 10 },
  { month: "Jun", users: 20 },
  { month: "Jul", users: 28 },
  { month: "Aug", users: 16 },
  { month: "Sep", users: 9 },
  { month: "Oct", users: 18 },
  { month: "Nov", users: 26 },
  { month: "Dec", users: 20 },
];

const visitorData = [
  { name: "Male", value: 70 },
  { name: "Female", value: 30 },
];

const COLORS = ["#8884d8", "#82ca9d"];

function Homepage() {
  return (
    <div className="p-5 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-5">Admin Homepage</h2>

      <div className="grid grid-cols-4 gap-5 mb-10">
        <Card title="Male Users" count={183} Icon={UserGroupIcon} />
        <Card title="Female Users" count={190} Icon={UserGroupIcon} />
        <Card title="Matches" count={80} Icon={HeartIcon} />
        <Card title="Saved Posts" count={112} Icon={BookmarkIcon} />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-gray-800 p-5 rounded-lg col-span-2">
          <h3 className="text-lg font-semibold mb-3">User Register by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <XAxis dataKey="month" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip cursor={{ fill: "#444" }} />
              <Bar dataKey="users" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Visitors Profile</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={visitorData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {visitorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, count, Icon }) => (
  <div className="flex items-center space-x-3 bg-blue-950 p-5 rounded-md w-full min-h-20">
    <Icon className="h-10 w-10 text-white" />
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-2xl font-bold text-white">{count}</p>
    </div>
  </div>
);

export default Homepage;
