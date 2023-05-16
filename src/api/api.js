import axios from "axios";

// * ссылка на api, хранится в файле .env
const baseURL = process.env.REACT_APP_API;

const token = localStorage.getItem("token");

// * создание шаблона функции, которая позволит делать запросы с базовой ссылкой на api
const $api = axios.create({
  baseURL,
  headers: {
    // * устанавливаем заголовок авторизации
    Authorization: `Bearer ${token}`,
  },
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // * регистрируем событие на запрос, который вернет статус ошибки 401 (не авторизован)
    if (error?.response?.status === 401) {
      const refresh = localStorage.getItem("token");
      if (refresh) {
        localStorage.setItem("token", refresh);
        localStorage.removeItem("refresh");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
      }
    }
    return Promise.reject(error);
  }
);

export { $api, baseURL };
