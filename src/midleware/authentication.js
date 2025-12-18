import jwt from 'jsonwebtoken';
import 'dotenv/config';
const secret_key = process.env.JWT_SECRET_KEY || "lsfm398fnsfj2Ar3q298";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret_123";
// Middleware para verificar el token JWT
export const authentication = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    console.log(token, "en authentication funcion")
    if (!token) return res.sendStatus(401);
    jwt.verify(token, secret_key, (err) => {
        if (err) return res.sendStatus(403);
        next();
    });
}

export const verifyRefreshToken = (token) => {
  if (!refreshTokens.includes(token)) {
    return null;
  }
  return jwt.verify(token, REFRESH_SECRET);
};
