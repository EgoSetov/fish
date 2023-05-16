import jwt from "jsonwebtoken";
import { User } from "../dataBase/users.db.js";

// * промежуточная функция, которая позволяет проверить, авторизован ли пользователь в системе
const isAuth = async (req, res, next) => {
  try {
    // * достаем свойство Authorization из заголовков запроса
    let token = req.get("Authorization");

    if (token && token.includes("Bearer")) {
      let splitToken = token.split(" ");
      token = splitToken[1];
    }

    // * проверяем валидность токена, раскодируем ее с помощью переменной окружения SECRET_KEY
    const decodedToken = jwt.decode(token, process.env.SECRET_KEY);

    if (!decodedToken || !decodedToken.id) return res.status(401).send("invalid token");

    // * запрос на получение пользовател по id
    const user = await User.getUserById(decodedToken.id);

    if (!user) return res.status(401).send("invalid token");

    // * добавление в объект req новые данные пользователя
    req.userId = user.id;
    req.userType = user.type;
    next();
  } catch (error) {
    next(error);
  }
};

export { isAuth };
