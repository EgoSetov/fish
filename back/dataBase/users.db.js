import { dataBase } from "./index.js";
import { v4 as uuidv4 } from "uuid";
import { ModelComments, ModelNews, News } from "./news.db.js";

export const ModelUsers = dataBase.collection("users");

// * объект, который имеет методы, которые позволят работать с firebase более удобно
export const User = {
  // * получение пользователя по его эл почте
  async getUserByEmail(email) {
    try {
      const model = await ModelUsers.where("email", "==", email).get();
      const user = model.docs.map((doc) => doc.data());
      return user[0];
    } catch (error) {
      console.log("[error]", error);
    }
  },

  // * получение пользователя по id
  async getUserById(userId) {
    try {
      const model = await ModelUsers.where("id", "==", userId).get();
      const user = model.docs.map((doc) => doc.data());
      if (user[0]) {
        delete user[0].password;
      }
      return user[0];
    } catch (error) {
      console.log("[error]", error);
    }
  },

  // * получение пользователей
  async getUsers() {
    try {
      const model = await ModelUsers.get();

      const users = model.docs.map((doc) => doc.data());

      return users.map((user) => {
        delete user.password;
        return user;
      });
    } catch (error) {
      console.log(error);
    }
  },

  // * создание пользователя (регистрация)
  async createUser(data) {
    try {
      const id = uuidv4();

      const user = {
        id,
        ...data,
      };

      await ModelUsers.doc(id).set(user);

      return user;
    } catch (error) {
      console.log(error);
    }
  },

  // * создание пользователя (регистрация)
  async updateUser(userId, data) {
    try {
      const user = ModelUsers.doc(userId);

      await user.update(data);

      return user;
    } catch (error) {
      console.log(error);
    }
  },

  // * удаление пользователя
  async deleteUser(userId) {
    try {
      await ModelUsers.doc(userId).delete();

      // * удаление постов пользователя
      const userNews = await News.getNews(1, userId);

      console.log("удалено постов пользователя", userNews.news.length);

      await Promise.all(
        userNews?.news?.map(async (news) => {
          await ModelNews.doc(news.id).delete();
        })
      );

      // * удаление комментариев пользователя
      const userComments = await News.getCommentsUser(userId);

      await Promise.all(
        userComments.map(async (comment) => {
          await ModelComments.doc(comment.id).delete();
        })
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export const getUsers = async () => {};
