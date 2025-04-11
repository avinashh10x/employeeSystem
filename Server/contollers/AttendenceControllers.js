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
        res.json({
            message: 'API hit successsfully',
            attendence,
        });
    } catch (error) {
        res.status(500).json({ message: "Error while fetching getting all attendence of a employee ", error });
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
        res.status(500).json({ message: "Error while fetching getting all attendence of all employee ", error });
    }
}

const getTodaysAttendenceOfAllEmployee = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const attendence = await Attendence.find({ checkIn: { $gte: today, $lte: endOfDay } }).sort({ _id: -1 });
        if (!attendence.length) {
            return res.status(404).json({ message: "No attendance records found for today" });
        }
        res.json(attendence);
    } catch (error) {
        res.status(500).json({ message: "Error fetching today's attendance of all employee", error });
    }
}

const getTodaysAttendenceOfanEmployee = async (req, res) => {
    try {
        const employeeId = req.params.employeeId || req.employeeId;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const attendence = await Attendence.find({ employeeId, checkIn: { $gte: today, $lte: endOfDay } });
        if (!attendence.length) {
            return res.status(404).json({
                checkIn_Out: "false",
                message: "No attendance records found for today"
            });
        }
        res.json({
            message: 'API hit successsfully',
            checkIn_Out: "true",
            attendence
        });
    } catch (error) {
        res.status(500).json({
            checkIn_Out: "false",
            message: "Error while fetching today's attendance of a employee",
            error
        });
    }
};

const addCheckIn = async (req, res) => {
    try {
        const employeeId = req.employeeId;
        const { location, url } = req.body;
        if (!location || !url) {
            return res.status(400).json({
                status: false,
                message: "Location and URL are required"
            });
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

        const employeeData = await Employee.findOne({ employeeId }).select('name');

        if (!employeeData) {
            return res.status(404).json({
                status: false,
                message: "Employee not found"
            });
        }


        const attendance = new Attendence({
            employeeId,
            location,
            name: employeeData.name,
            url,
            checkIn: new Date(),
        });

        await attendance.save();
        res.status(201).json({
            status: true,
            message: "Check-in added successfully",
            attendance
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while adding check-in",
            error: error.message
        });
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
            return res.status(404).json({
                status: false,
                message: "Employee has not checked in today"
            });
        }

        const lastAttendance = attendance[0];
        if (lastAttendance.checkOut) {
            return res.status(400).json({ message: "Already checked out for this entry" });
        }

        lastAttendance.checkOut = new Date();
        await lastAttendance.save();

        res.status(200).json({
            status: true,
            message: "Check-out added successfully",
            attendance: lastAttendance
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while adding check-out",
            error: error.message
        });
    }
};

module.exports = {
    getallAttendence0faEmployee,
    getTodaysAttendenceOfanEmployee,
    getAllAttendenceOfEveryOne,
    addCheckIn,
    addCheckout,
    Home,
    getTodaysAttendenceOfAllEmployee
};
