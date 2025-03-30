const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    // employeeId: {
    //     type: mongoose.Schema.Types.ObjectId, // Reference to Employee's _id
    //     ref: 'Employee', // Reference the Employee model
    //     required: true
    // },
    employeeId: {
        type: String, 
        required: true
    },
    checkIn:{
        type: Date,
        // default: Date.now()
        // required: true
    },
    
    checkOut:{
        type: Date,
        // default: Date.now()

    }

    
}, { timestamps: true })


const Attendece = mongoose.model("attendence",attendenceSchema)

module.exports = Attendece;   