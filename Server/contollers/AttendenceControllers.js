const Attendence = require('../model/attendenceModel.js');
const Employee = require('../model/employeeModel');

const Home = async (req, res) => {
    res.send('Hello, World! from attendance server');
};

const getallAttendence0faEmployee = async (req, res) => {
    try {
        const employeeId = req.params.employeeId || req.employeeId;

        const attendence = await Attendence.find({ employeeId }).sort({ _id: -1 });
        if (!attendence.length) {
            return res.status(404).json({ message: "No attendance records found for this employee" });
        }
        res.json(attendence);
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance records", error });
    }
};

const getAllAttendenceOfEveryOne = async (req, res) => {
    try {
        const attendence = await Attendence.find({}).sort({ _id: -1 });
        if (!attendence.length) {
            return res.status(404).json({ message: "No attendance records found" });
        }
        res.json(attendence);
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance records", error });
    }
}

const getTodaysAttendenceOfaEmployee = async (req, res) => {
    try {
        const employeeId = req.params.employeeId || req.employeeId;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const attendence = await Attendence.find({ employeeId, checkIn: { $gte: today, $lte: endOfDay } });
        if (!attendence.length) {
            return res.status(404).json({ message: "No attendance records found for today" });
        }
        res.json(attendence);
    } catch (error) {
        res.status(500).json({ message: "Error fetching today's attendance", error });
    }
};

const addCheckIn = async (req, res) => {
    try {
        const employeeId = req.employeeId;
        const { location, url } = req.body;
        if (!location || !url) {
            return res.status(400).json({ message: "Location and URL are required" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingAttendance = await Attendence.find({
            employeeId,
            checkIn: { $gte: today }
        });

        if (existingAttendance.length >= 2) {
            return res.status(400).json({ message: "Check-in limit reached for today" });
        }

        const attendance = new Attendence({
            employeeId,
            location,
            url,
            checkIn: new Date(),
        });

        await attendance.save();
        res.status(201).json({ message: "Check-in added successfully", attendance });
    } catch (error) {
        res.status(500).json({ message: "Error while adding check-in", error: error.message });
    }
};

const addCheckout = async (req, res) => {
    try {
        const employeeId = req.employeeId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendence.find({
            employeeId,
            checkIn: { $gte: today }
        }).sort({ checkIn: -1 });

        if (!attendance.length) {
            return res.status(404).json({ message: "Employee has not checked in today" });
        }

        const lastAttendance = attendance[0];
        if (lastAttendance.checkOut) {
            return res.status(400).json({ message: "Already checked out for this entry" });
        }

        lastAttendance.checkOut = new Date();
        await lastAttendance.save();

        res.status(200).json({ message: "Check-out added successfully", attendance: lastAttendance });
    } catch (error) {
        res.status(500).json({ message: "Error while adding check-out", error: error.message });
    }
};

module.exports = {
    getallAttendence0faEmployee,
    getTodaysAttendenceOfaEmployee,
    getAllAttendenceOfEveryOne,
    addCheckIn,
    addCheckout,
    Home
};
