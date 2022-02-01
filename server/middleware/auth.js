const jwt = require("jsonwebtoken");
const config = require("config");
const { jwtSecret } = config;

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    // Add user from payload
    req.user = decoded;
    //console.log(decoded);
    next();
  } catch (e) {
    res.status(400).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
