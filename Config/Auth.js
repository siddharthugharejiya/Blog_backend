const jwt = require('jsonwebtoken');

const Auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization token missing or invalid" });
        }

        const token = authHeader.split(" ")[1]; 
        console.log("Token:", token);

        const decoded = jwt.verify(token, "SID"); 
        req.body.userId = decoded.userId; 
        console.log("Decoded User ID:", req.body.userId);

        next(); 
    } catch (error) {
        console.error("Authentication Error:", error.message);
        res.status(401).json({ message: "Authentication failed" });
    }
};

module.exports = Auth;
