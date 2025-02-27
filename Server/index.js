require('dotenv').config()
const express = require('express');
const EmployeeRoute = require('./routes/EmployeeRoutes')
const connectDb = require('./config/db')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello, World!');
})

// Import the employee model
app.use('/api', EmployeeRoute);



app.listen(PORT, () => {
    console.log(`your server is running at http://localhost:${process.env.PORT}`);
});
