import mongoose from "mongoose";

export { dbCon };

export default function dbCon() {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(
      "mongodb+srv://mongodb:cENOdxuOdk0C0G4c@cluster0.bfglo.mongodb.net/dummy?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = mongoose.connection;
    console.log("Connecting to database...");
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
  } catch (error) {
    console.log(error);
  }
}
