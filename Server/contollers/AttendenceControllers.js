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

const addAttendence = async (req, res) => {
    try {
        const employeeId = req.employeeId
        const { location, checkIn, url } = req.body;

        const employee = await Employee.findOne(employeeId)
        if (!employee || location || checkIn || checkOut) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const attendence = new Attendence({
            url,
            employeeId,
            location,
            checkIn,
            // checkOut,
        });
        await attendence.save();

        res.status(201).json({ message: "Attendence added successfully", attendence });




    } catch (error) {
        res.status(500).json({ message: "error while adding attendence", error: error });

    }
}
