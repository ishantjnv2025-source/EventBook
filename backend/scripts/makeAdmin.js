import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import User from "../models/User.js";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
    console.error("Usage: npm run make-admin -- user@example.com");
    process.exit(1);
}

try {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "eventbook",
        serverSelectionTimeoutMS: 15000,
    });
    const user = await User.findOneAndUpdate(
        { email },
        { role: "admin" },
        { returnDocument: "after" }
    );

    if (!user) {
        console.error(`No user found for ${email}. Register the user first.`);
        process.exitCode = 1;
    } else {
        console.log(`${user.email} is now an admin.`);
    }
} catch (error) {
    console.error("Unable to promote user:", error.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
