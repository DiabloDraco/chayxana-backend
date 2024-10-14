import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.DB_SECRET;

const generateToken = (payload) => {
  const options = {
    expiresIn: "1d",
  };

  const token = jsonwebtoken.sign(payload, secretKey, options);

  return token;
};

const generateRefreshToken = (payload) => {
  const refresh = process.env.DB_REFRESH;

  const options = {
    expiresIn: "3d",
  };

  const token = jsonwebtoken.sign(payload, refresh, options);

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return false;
  }
};

const verifyRefreshToken = (token) => {
  try {
    const refresh = process.env.DB_REFRESH;
    const decoded = jsonwebtoken.verify(token, refresh);
    return decoded;
  } catch (err) {
    return null;
  }
};

export { generateToken, verifyToken, verifyRefreshToken, generateRefreshToken };
