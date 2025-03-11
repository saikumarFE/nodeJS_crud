const express = require("express");
const router = express.Router();
const orderController = require("../../app/controllers/orderController/orderController");
const OrderController = orderController();
router.post("/create",OrderController.createOrder);
router.put("/update/:orderId",OrderController.updateOrder);
router.delete("/delete/:orderId",OrderController.deleteOrder);
router.get("/:userId",OrderController.getOrderListBasedOnUser);
module.exports = router;