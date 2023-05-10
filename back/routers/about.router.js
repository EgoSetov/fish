import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { News } from "../dataBase/news.db.js";
import { Abount } from "../dataBase/abount.db.js";

const abountRouter = Router();

// * вывод
abountRouter.get(
  "/get/",
  asyncWrapper(async (req, res) => {
    const abount = await Abount.getAbounts();

    res.send(abount);
  })
);

// * создание
abountRouter.post(
  "/create",
  isAuth,
  asyncWrapper(async (req, res) => {
    const { body, userType, files } = req;

    if (userType !== "admin") return res.status(403).json({ message: "Недостаточно прав" });

    const dataAbout = body;

    const about = await Abount.createAbount(dataAbout);

    res.status(201).json(about);
  })
);

// * изменение
abountRouter.patch(
  "/update/:aboutId",
  isAuth,
  asyncWrapper(async (req, res) => {
    const {
      params: { aboutId },
      body,
      userType,
    } = req;

    if (userType !== "admin") return res.status(403).json({ message: "Недостаточно прав" });

    const dataAbout = body;

    await Abount.updateAbount(aboutId, dataAbout);

    res.sendStatus(200);
  })
);

// * удаление
abountRouter.delete(
  "/delete/:aboutId",
  isAuth,
  asyncWrapper(async (req, res) => {
    const {
      params: { aboutId },
      userType,
    } = req;

    if (userType !== "admin") return res.status(403).json({ message: "Недостаточно прав" });

    await Abount.deleteAbount(aboutId);

    res.sendStatus(200);
  })
);

export default abountRouter;
