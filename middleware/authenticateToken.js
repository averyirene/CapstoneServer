import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Token verification failed" });
        }
        req.payload = payload;
        next();
    });
};

export { authenticateToken };
