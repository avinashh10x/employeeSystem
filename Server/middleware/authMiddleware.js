const jwt = require('jsonwebtoken');
const SECRETKEY = process.env.SECRETKEY || 'yourSecretKey';
const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, SECRETKEY);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.employeeId = decoded.employeeId;
        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = authMiddleware;
