import { findOrderData } from "../../../data/order/find.mjs";
import { insertOrder } from "../../../data/order/insert.mjs";

export const user_orderAddGet = async (req, res) => {
  try {
    const userAddress = req.session.USER_ORDER_DEFAULT_ADDRESSID;

    const userId = req.session.USER_ID;
    const paymentMethod = req.query.paymentMethod;
    const paymentId = req.query.paymentId

    const order = await insertOrder(userId, userAddress, paymentMethod,paymentId);


    req.session.ORDER_PLACED = order
    console.log(order,'order of that product is showing ');
    res.json({ result: "success" });
  } catch (error) {
    console.log(error, "USER ORDER ADD GET");
  }
};

export const user_orderListGet = async (req, res) => {
  try {
    const userId = req.session.USER_ID
    const order = await findOrderData(userId);
    res.render("order", { order });
  } catch (error) {
    console.log(error, "USER ORDER GET");
  }
};
