import { dataBase } from "./index.js";
import { v4 as uuidv4 } from "uuid";

export const ModelAbount = dataBase.collection("abouts");

export const Abount = {
  async getAbounts() {
    try {
      const model = await ModelAbount.get();

      const abouts = model.docs.map((doc) => doc.data());

      return abouts;
    } catch (error) {
      console.log(error);
    }
  },

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

  async updateAbount(abountId, data) {
    try {
      const abount = ModelAbount.doc(abountId);

      await abount.update(data);

      return abount;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteAbount(abountId) {
    try {
      await ModelAbount.doc(abountId).delete();
    } catch (error) {
      console.log(error);
    }
  },
};

export const getUsers = async () => {};
