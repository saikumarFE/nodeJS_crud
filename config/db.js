const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/amazon";
const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000, // Timeout if MongoDB is not found
        })
        console.log("✅ MongoDB Connected Successfully!");
    } catch (err) {
        console.log("✅ MongoDB Connected Error!", err);
    }
}
ConnectDB();
module.exports = ConnectDB;