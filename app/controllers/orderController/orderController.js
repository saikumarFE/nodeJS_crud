const Order = require("../../models/order");
const Product = require("../../models/product");
function OrderController() {
  return {
    async createOrder(req, res) {
      const { user, products, totalCost } = req.body;
      try {
        for (let item of products) {
          const product = await Product.findById(item.product);

          if (!product) {
            return res
              .status(404)
              .json({ message: `Product with ID ${item.product} not found` });
          }

          if (product.count < item.quantity) {
            return res.status(400).json({
              message: `Insufficient stock for product: ${product.name}`,
            });
          }

          // Reduce the count of the product
          product.count -= item.quantity;
          await product.save();
        }

        // Step 2: Create the order
        const order = new Order({ user, products, totalCost });
        await order.save();

        res.status(201).json({ message: "Order placed successfully", order });
      } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
      }
    },
    async updateOrder(req, res) {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ message: "order Not found", order });
      }
      return res
        .status(201)
        .json({ message: "Order status updated successfully", order });
    },
    async deleteOrder(req, res) {
      const order = await Order.findByIdAndDelete(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: "order Not found", order });
      }
      return res
        .status(201)
        .json({ message: "Order Deleted successfully", order });
    },
    async getOrderListBasedOnUser(req, res) {
      const orders = await Order.find({ user: req.params.userId }).populate("products");;
      if (!orders) {
        return res
          .status(404)
          .json({ message: "order's Not found", user: req.params.userId });
      }
      return res
        .status(201)
        .json({ message: "Fetched User Orders successfully", orders });
    },
  };
}
module.exports = OrderController;

