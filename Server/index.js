require('dotenv').config()
const express = require('express');
const EmployeeRoute = require('./routes/EmployeeRoutes')
const connectDb = require('./config/db')
const cors = require('cors');
const serverLess = require("serverless-http")

const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

// Import the employee model
app.use('/api', EmployeeRoute);



app.listen(PORT, () => {
    console.log(`your server is running at http://localhost:${PORT}`);
});


// module.exports.handler = serverLess(app)