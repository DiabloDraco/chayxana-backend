import {
  findTopProducts,
  findCash,
  countRequests,
  getCustomers,
} from "../services/dashboard.service.js";

const GETPRODUCTS = async (req, res) => {
  try {
    const { type } = req.query;
    const products = await findTopProducts(type);
    res.status(200).send(products);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const GETCASH = async (req, res) => {
  try {
    const { type } = req.query;
    const cash = await findCash(type);

    res.status(200).send(cash);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const GETCOUNT = async (req, res) => {
  try {
    const { type } = req.query;
    const cash = await countRequests(type);

    res.status(200).send(cash);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const GETCUSTOMERS = async (req, res) => {
  try {
    const { type } = req.query;
    const cash = await getCustomers(type);

    res.status(200).send(cash);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// const GETCATEGORIES = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const products = await findTopCategories(startDate, endDate);
//     res.status(200).send(products);
//   } catch (error) {
//     return res.status(400).send({ message: error.message });
//   }
// };

// const GETTOPPRODUCTS = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const products = await findTopProducts(startDate, endDate);
//     res.status(200).send(products);
//   } catch (error) {
//     return res.status(400).send({ message: error.message });
//   }
// };

// const GETSTATUSES = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const products = await findCountRequestsByStatus(startDate, endDate);
//     res.status(200).send(products);
//   } catch (error) {
//     return res.status(400).send({ message: error.message });
//   }
// };

export { GETPRODUCTS, GETCASH, GETCOUNT, GETCUSTOMERS };
