const jwt = require("jsonwebtoken");
function authMiddleWare(req,res,next){
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No Token Provided." });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Store user info in the request object
        next(); // Move to the next middleware/controller
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
}
module.exports = authMiddleWare;