import { findAllBranches, findAllTables } from "../services/lists.service.js";
const GETBRANCHES = async (req, res) => {
  try {
    const items = await findAllBranches();

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const GETTABLES = async (req, res) => {
  try {
    const items = await findAllTables();

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { GETBRANCHES, GETTABLES };
