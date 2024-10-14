import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const deletePhoto = async (photo) => {
  try {
    const filePath = path.join(__dirname, "..", "..", "..", "uploads", photo);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, async (err) => {
        if (err) {
          return new Error("Ошибка удаления файла");
        }
      });
    } else {
      return new Error("Файл не найден");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default deletePhoto;
