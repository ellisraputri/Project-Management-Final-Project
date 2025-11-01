import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
            next(); 
        } else {
            return res.status(401).json({ success: false, message: "Invalid token payload" });
        }
        
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default userAuth;