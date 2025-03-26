const roleMiddleware = (requiredRole) => (req, res, next) => {
    if (req.role === requiredRole) {
        return next(); 
    }
    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
};

module.exports = roleMiddleware;