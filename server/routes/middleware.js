import jwt from "jsonwebtoken";

function verifyUser(req, res, next) {
  const token = req.cookies.token;
  console.log("Raw headers:", req.headers.cookie); // Check if cookie exists at all
  console.log("token:", token);
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

export default verifyUser;
