import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; 
      }
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode?.id) {
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default userAuth;
