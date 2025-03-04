const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL
const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('Database connected');

    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

module.exports = connectDb;