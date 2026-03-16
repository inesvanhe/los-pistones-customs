import mongoose from "mongoose";
import { settings } from "./settings.js";

export default async function connectDB() {
  try {
    await handleConnection();
  } catch (error) {
    console.log("DB Error: ", error);
  }
}

async function handleConnection() {
  await mongoose.connect(settings.DB_CONNECTION_STRING);
  console.log("Erfolgreich zur Datenbank verbunden!");

  mongoose.connection.on("disconnected", () => {
    console.log("Verbindung zum Server unterbrochen!");
    reConnectDB();
  });

  mongoose.connection.on("error", (err) => {
    console.log("Ein Fehler innerhalb der DB ist aufgetreten: ", err);
    reConnectDB();
  });
}

async function reConnectDB() {
  const timeout = setTimeout(async () => {
    try {
      console.log("Starte reconnect zur DB.");
      await handleConnection();
      clearTimeout(timeout);
    } catch (error) {
      console.log("Fehler beim Versuch, erneut zu verbinden");
      reConnectDB();
    }
  }, 5000);
}
