import React, { useState } from 'react';

function Setting() {
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState(true);

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
        alert(`Theme changed to ${e.target.value}`);
    };

    const handleNotificationsToggle = () => {
        setNotifications(!notifications);
        alert(`Notifications ${!notifications ? 'enabled' : 'disabled'}`);
    };

    return (
        <div className="p-5 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-bold mb-5">Admin Settings</h2>
            <div className="space-y-6">
                {/* Theme Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <select
                        value={theme}
                        onChange={handleThemeChange}
                        className="p-2 bg-gray-800 text-white rounded w-full"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                {/* Notifications Toggle */}
                <div>
                    <label className="block text-sm font-medium mb-2">Notifications</label>
                    <button
                        onClick={handleNotificationsToggle}
                        className={`px-4 py-2 rounded ${notifications ? 'bg-green-600' : 'bg-red-600'
                            }`}
                    >
                        {notifications ? 'Disable Notifications' : 'Enable Notifications'}
                    </button>
                </div>

                {/* Update Profile */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Update Profile</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Update Admin Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Setting;