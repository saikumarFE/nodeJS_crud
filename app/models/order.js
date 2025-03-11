const mongoose = require("mongoose");
const User = require("../models/user");
const Product = require("../models/product");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalCost: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending","Order Placed", "Shipment", "Out For Delivery", "Delivered"],
    default: "Pending"
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Order", orderSchema);
