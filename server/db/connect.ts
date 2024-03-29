import mongoose from "mongoose";

export const connect = async (dbname: string) => {
  const username = process.env.DB_USER_NAME;
  const password = process.env.DB_PASSWORD;
  const cluster = process.env.DB_CLUSTER;
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.v5o6onf.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error: "));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
};