import {
  findAllBranches,
  findAllTables,
  createTableItem,
  deleteTableItem,
} from "../services/lists.service.js";
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

const POSTTABLE = async (req, res) => {
  try {
    const { table_id, branch_id } = req.body;

    const item = await createTableItem({ table_id, branch_id });
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const DELETETABLE = async (req, res) => {
  try {
    const table_id = req.params.id;

    const item = await deleteTableItem({ table_id });
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export { GETBRANCHES, GETTABLES, POSTTABLE, DELETETABLE };
