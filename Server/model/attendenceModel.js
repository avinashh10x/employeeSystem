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
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },

    checkIn:{
        type: Date,
        default: Date.now
    },
    
    checkOut:{
        type: Date,
        default: Date.now
    }

    
}, { timestamps: true })


const Attendece = mongoose.model("attendence",attendenceSchema)

module.exports = Attendece;   