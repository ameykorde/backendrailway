import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token from request header
 * req - Express request object
 * res - Express response object
 * next - Next middleware function
 */

const verify = (req, res, next) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // If token is not found, return 401 status code
  if (!token) {
    return res.status(401).send({ message: 'Access Denied' });
  }

  try {
    // Verify token with JWT_SECRET and attach decoded payload to request object
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    // If token is invalid, return 400 status code
    res.status(400).send({ message: 'Invalid Token' });
  }
}

// Export middleware function
export default verify;
