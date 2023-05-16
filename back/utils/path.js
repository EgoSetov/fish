import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url)); // * текущая директория

const PATH_TEMP = path.join(__dirname, "..", "temp"); // * директория, куда первоначально загружаются файлы

const PATH_AVATARS = path.join(__dirname, "..", "uploads", "avatars"); // * директория, где храняться аватарки пользователя

const PATH_NEWS = path.join(__dirname, "..", "uploads", "news"); // * директория, где храняться фотографии постов

const PATH_UPLOADS = path.join(__dirname, "..", "uploads"); // * директория директорий, где храняться данные

export { PATH_TEMP, PATH_AVATARS, PATH_UPLOADS, PATH_NEWS };
