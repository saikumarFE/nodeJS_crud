const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true },
    count: { type: Number, required: true, default: 0 }
})
const product = mongoose.model("Product", productSchema);
module.exports = product;