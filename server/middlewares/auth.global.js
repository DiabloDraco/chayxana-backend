import { verifyToken } from "../plugins/jwt.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Пользователь не авторизован" });
    }
    const result = await verifyToken(token);
    if (result) {
      req.user = result;
      return next();
    } else {
      return res.status(401).send({ message: "Пользователь не авторизован" });
    }
  } catch (error) {
    return res.status(401).send({ message: "Пользователь не авторизован" });
  }
};

export default auth;
