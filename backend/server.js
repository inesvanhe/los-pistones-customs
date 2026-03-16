import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Mit MongoDB verbunden");
  })
  .catch((error) => {
    console.error("Fehler bei der Verbindung zu MongoDB:", error);
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
