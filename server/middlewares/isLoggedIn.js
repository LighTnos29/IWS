import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Session expired, please login again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email }).select('-password');

        if (!user) {
            return res.status(401).json({ message: "User not found." });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token, please login again." });
    }
}

export default isLoggedIn;