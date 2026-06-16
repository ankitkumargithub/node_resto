const token = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

const generateToken = (user) => {
    return token.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { jwtMiddleware, generateToken } ;