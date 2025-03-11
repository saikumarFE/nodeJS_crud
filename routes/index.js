const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes/userRoutes");
const productRoutes = require("./productRoutes/productRoutes");
const UserController = require("../app/controllers/userController/userController");
const authMiddleWare = require("../app/middlewares/authMiddleware");
const orderRoutes = require("../routes/orderRoutes/orderRoutes");
const userController = UserController();
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.post("/login",userController.authenticateUser);
router.get("/dashboard", authMiddleWare, (req, res) => {
    res.json({ message: "Welcome to the protected dashboard!", user: req.user });
});
//router.use("/order",orderRoutes);
module.exports = router;
