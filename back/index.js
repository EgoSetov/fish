import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/users.router.js";
import newsRouter from "./routers/news.router.js";
import abountRouter from "./routers/about.router.js";
import cors from "cors";
import path from "path";
import { PATH_UPLOADS } from "./utils/path.js";

// * dotenv - для возможности просматривать перменные окружения, то есть переменные из файла .env
dotenv.config();

const app = express();

// * bodyParser для преобразование данных json в обычный формат для работы
app.use(bodyParser.json());

// * cors политика для взамодействия приложения с апи
app.use(cors());

// * маршруты по которым можно делать запросы
app.use("/users", userRouter);
app.use("/news", newsRouter);
app.use("/about", abountRouter);

// * маршрут для статических файлов
app.use("/uploads", express.static(path.join(PATH_UPLOADS)));

const PORT = process.env.PORT || 3000;
const MODE = process.env.MODE || "development";

// * функция, которая запустит приложение на порту, который указан в переменной PORT
app.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log("app starting on port: " + PORT);
  console.log("mode: " + MODE);
});
