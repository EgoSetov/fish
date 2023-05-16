import { dataBase } from "./index.js";
import { v4 as uuidv4 } from "uuid";

export const ModelAbount = dataBase.collection("abouts");

// * объект, который имеет методы, которые позволят работать с firebase более удобно
export const Abount = {
  // * получение всей информации
  async getAbounts() {
    try {
      const model = await ModelAbount.get();

      const abouts = model.docs.map((doc) => doc.data());

      return abouts;
    } catch (error) {
      console.log(error);
    }
  },

  // * создание  информации
  async createAbount(data) {
    try {
      const id = uuidv4();

      const newAbount = {
        id,
        ...data,
      };

      await ModelAbount.doc(id).set(newAbount);

      return newAbount;
    } catch (error) {
      console.log(error);
    }
  },

  // * изменение всей информации
  async updateAbount(abountId, data) {
    try {
      const abount = ModelAbount.doc(abountId);

      await abount.update(data);

      return abount;
    } catch (error) {
      console.log(error);
    }
  },

  // * удалении всей информации
  async deleteAbount(abountId) {
    try {
      await ModelAbount.doc(abountId).delete();
    } catch (error) {
      console.log(error);
    }
  },
};

export const getUsers = async () => {};
