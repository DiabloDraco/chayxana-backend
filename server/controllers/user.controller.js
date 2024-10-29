import {
  changePassword,
  deleteItem,
  findAll,
  findOne,
  insertItem,
  updatePhoto,
} from "../services/user.service.js";
import deletePhoto from "../plugins/file.js";

const GET = async (req, res) => {
  try {
    const items = await findAll();

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const GETID = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await findOne(id);

    if (!item) return new Error({ message: "Ничего не найдено" });

    res.status(200).send(item);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return new Error("Id не найден");

    const deleted = await deleteItem({ id });

    res.status(200).send({ message: "Deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const UPADTEPHOTO = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      surname,
      birth_date,
      gender,
      address,
      position,
      entrance,
      floor,
      room,
      comment,
      mail,
    } = req.body;
    if (!id) return new Error("Id не обнаружен");
    if (req.file) {
      const filename = req.file.filename;

      const oldItem = await findOne(id);
      if (!oldItem) return new Error("Wrong id");

      await deletePhoto(oldItem.avatar);

      const newItem = await updatePhoto({
        filename,
        name,
        surname,
        id,
        birth_date,
        gender,
        address,
        position,
        entrance,
        floor,
        room,
        comment,
        mail,
      });
      res.status(200).send("Файл успешно обновлен и старый файл удален.");
    } else {
      const newItem = await updatePhoto({
        name,
        surname,
        id,
        birth_date,
        gender,
        address,
        position,
        entrance,
        floor,
        room,
        comment,
        mail,
      });

      res.status(200).send("ßуспешно обновлен.");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const POST = async (req, res) => {
  try {
    const { name, surname, login, password, role_id, phone } = req.body;
    const photo = req.file?.filename;
    if (!name || !surname || !login || !password || !role_id)
      return new Error("All datas is required");

    const item = await insertItem({
      name,
      surname,
      login,
      password,
      role_id,
      phone,
      photo: photo ? photo : null,
    });
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const UPDATEPASSWORD = async (req, res) => {
  try {
    const { password, new_password } = req.body;
    const user_id = req.params.id;

    const item = await changePassword({ password, new_password, user_id });

    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { GET, GETID, DELETE, UPADTEPHOTO, POST, UPDATEPASSWORD };
