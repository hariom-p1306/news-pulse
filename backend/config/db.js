import mongoose from "mongoose";

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "news_pulse",
    });

    console.log("✅ MongoDB Connected");
    console.log("📂 Database :", mongoose.connection.db.databaseName);

  } catch (error) {

    console.error("❌ Database Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;