const User = require("../../models/user");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const { emitEvent } = require("../../../socket/socket");
function UserController() {
    return {
        async getAllUsers(req, res) {
            try {
                const users = await User.find().sort({ createdAt: -1 });;
                return res.status(201).json({ users: users, message: "Fetched Users sucessfully" });
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async getByUserName(req, res) {
            try {
                const { username } = req.params;
                const user = await User.findOne({ username: username });
                return res.status(201).json({ user: user, message: "Fetched Users sucessfully" });
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async deleteUser(req, res) {
            try {
                const { username } = req.params;
                await User.deleteOne({ username: username });
                res.status(200).json({ message: "Deleted User Sucessfully" });
            } catch (error) {
                console.error("Error deleting user:", error);
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async createUser(req, res) {
            try {
                const { username, password, email, role } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    username,
                    password: hashedPassword,
                    email,
                    role
                });
                await newUser.save();
                emitEvent("new_user", newUser);
                return res.status(201).json({ message: "User created successfully", user: newUser });
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async updateUser(req, res) {
            try {
                const { username, password, email, role } = req.body;
                if (!username || !password || !email || !role) {
                    return res(500).json({ message: "Every field value need" });
                }
                const user = await User.findOne({ email: email });
                if (!user) {
                    return res(500).json({ message: "User Not found" });
                }
                if (username) user.username = username;
                if (email) user.email = email;
                if (password) user.password = await bcrypt.hash(password, 10); // Hash new password
                if (role) user.role = role;
                await user.save();
                emitEvent("update_user",user);
                return res.status(201).json({ message: "User Updated Sucessfully", user: user });
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        },
        async authenticateUser(req, res) {
            try {
                const { username, password, role, email } = req.body;
                const user = await User.findOne({ email: email });
                if (!user) {
                    return res.status(500).json({ message: "User Not Exist" });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
                // Generate JWT token
                const token = jwt.sign({ username:username,role:role }, SECRET_KEY, { expiresIn: "1h" });
                return res.status(201).json({ token ,message:"User Authenticated Sucessfully"});
            } catch (error) {
                return res.status(500).json({ message: "Server Error", error: error });
            }
        }
    }
}
module.exports = UserController;