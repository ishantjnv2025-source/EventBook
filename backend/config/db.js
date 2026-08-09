import mongoose from "mongoose";

import dns from "node:dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);
 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "eventbook"
     });

    console.log("✅ MongoDB Connected");
    console.log("Host:", conn.connection.host);
    console.log("Database:", conn.connection.name);

  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;