import jwt from "jsonwebtoken";
import "dotenv/config";

const secret_key =
  process.env.JWT_SECRET_KEY || "lsfm398fnsfj2Ar3q298";

const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "refresh_secret_123";

// ⚠️ En producción esto va en DB
let refreshTokens = [];

export const generateTokens = (userData) => {
  const user = { id: userData.id, email: userData.email };

  // 🔐 Access token (corto)
  const accessToken = jwt.sign(user, secret_key, {
    expiresIn: "1h"
  });

  // 🔁 Refresh token (largo)
  const refreshToken = jwt.sign(user, REFRESH_SECRET, {
    expiresIn: "7d"
  });

  refreshTokens.push(refreshToken);
  console.log("Token creado: ", accessToken)
  const tokens = {accessToken: accessToken, refreshToken: refreshToken}

  return tokens;
};
