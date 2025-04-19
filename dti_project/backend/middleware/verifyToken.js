

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	// Get token from either cookies or Authorization header
	const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
	}
};
