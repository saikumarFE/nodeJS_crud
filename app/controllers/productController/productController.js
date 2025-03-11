const Product = require("../../models/product");
function ProductController() {
    return {
        async getAllProductDetails(req, res) {
            try {
                const products = await Product.find().sort({ createdAt: -1 });;
                return res.status(201).json({ products: products, message: "Fetched Products sucessfully" });
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async getByProductName(req, res) {
            try {
                const { name } = req.params;
                const product = await Product.findOne({ name: name });
                return res.status(201).json({ product: product, message: "Fetched Users sucessfully" });
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async deleteProductByProductName(req, res) {
            try {
                const { name } = req.params;
                await Product.deleteOne({ name: name });
                res.status(200).json({ message: "Deleted Product Sucessfully" });
            } catch (error) {
                console.error("Error deleting user:", error);
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async createProduct(req, res) {
            try {
                const { name, desc, price, count, isAvailable } = req.body;
                const product = new Product({
                    name,
                    desc,
                    price,
                    count,
                    isAvailable
                });
                await product.save();
                return res.status(201).json({ message: "Product created successfully", user: newUser });
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async updateProductByProductName(req, res) {
            try {
                const { name, price, isAvailable, count, desc } = req.body;
                if (!name || !price || !isAvailable || !count || !desc) {
                    return res(500).json({ message: "Every field value need" });
                }
                const product = await Product.findOne({ name: name });
                if (!product) {
                    return res(500).json({ message: "User Not found" });
                }
                if (name) product.name = name;
                if (count) product.count = count;
                if (isAvailable) product.isAvailable = isAvailable // Hash new password
                if (role) product.role = role;
                if (desc) product.desc = desc;
                await product.save();
                return res.status(201).json({ message: "User Updated Sucessfully", product: product });
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        }
    }
};

module.exports = ProductController;
