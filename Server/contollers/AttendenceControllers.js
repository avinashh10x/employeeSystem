const Attendence = require('../model/attendenceModel.js')
const Employee = require('../model/employeeModel');



const Home = async (req, res) => {
    res.send('Hello, World! from attendence server');
};


const getallAttendence = async (req, res) => {
    try {
        const attendence = await Attendence.find({}).sort({ _id: -1 })
        res.json(attendence);
    } catch (error) {
        res.status(500).json({ message: "error while fetching all attendence", error: error });
    }
}


const addCheckIn = async (req, res) => {
    try {
        const employeeId = req.employeeId; // Extracted from authMiddleware
        const { location, url } = req.body;

        // Validate required fields
        if (!location || !url) {
            return res.status(400).json({ message: "Location and URL are required" });
        }

        // Get the current date (without time) for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight

        // Check if an attendance record already exists for today
        const existingAttendance = await Attendence.findOne({
            employeeId,
            checkIn: { $gte: today } // Check if there's a record for today
        });

        // if (existingAttendance) {
        //     return res.status(400).json({ message: "Employee has already checked in for today" });
        // }

        // Create a new attendance document with check-in time
        const attendance = new Attendence({
            employeeId,
            location,
            url,
            checkIn: new Date(), // Set current time as check-in
        });

        await attendance.save();
        res.status(201).json({ message: "Check-in added successfully", attendance });
    } catch (error) {
        console.error("Error in addCheckIn:", error.message);
        res.status(500).json({ message: "Error while adding check-in", error: error.message });
    }
};


const addCheckout = async (req, res) => {
    try {
        const employeeId = req.employeeId; // Extracted from authMiddleware

        // Get the current date (without time) for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight

        // Find the attendance record for today
        const attendance = await Attendence.findOne({
            employeeId,
            checkIn: { $gte: today } // Check if there's a record for today
        });

        if (!attendance) {
            return res.status(404).json({ message: "Employee has not checked in yet" });
        }

        // if (attendance.checkOut) {
        //     return res.status(400).json({ message: "Employee has already checked out for today" });
        // }

        // Update the check-out time
        attendance.checkOut = new Date(); // Set current time as check-out
        await attendance.save();

        res.status(200).json({ message: "Check-out added successfully", attendance });
    } catch (error) {
        console.error("Error in addCheckout:", error.message);
        res.status(500).json({ message: "Error while adding check-out", error: error.message });
    }
};


module.exports = {
    Home,
    addCheckIn,
    addCheckout,
    getallAttendence
}