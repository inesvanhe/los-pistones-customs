import express, { json } from "express";
import { settings } from "./src/config/settings.js";
import { AnswerCreator } from "./src/lib/AnswerCreator.js";
import { ErrorCreator } from "./src/lib/ErrorCreator.js";
import { Logger } from "./src/middleware/logger.js";
import connectDB from "./src/config/db.config.js";

// Verbindung zur DB wird hergestellt, bevor der Server startet
async function startServer() {
  try {
    await connectDB(); // Warten, bis die DB-Verbindung erfolgreich hergestellt ist
  } catch (err) {
    console.error("Fehler bei der Verbindung zur DB:", err);
    process.exit(1); // Prozess beenden bei Verbindungsfehler
  }

  const app = express();
  app.use(json());

  // Routen

  // 404 Fehlerbehandlung: Wenn keine Route gefunden wurde
  app.use((req, res, next) => {
    next(ErrorCreator(404, "Ouh, diese Ressource existiert nicht!"));
  });

  // Fehlerbehandlung: Alle Fehler werden hier abgefangen und zurückgegeben
  app.use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .json(AnswerCreator(err.status || 500, err.message || "Server-Fehler"));
  });

  // Server starten
  app.listen(settings.PORT, () => {
    console.log(`Server läuft auf Port ${settings.PORT}`);
  });
}

// Starte den Server
startServer();
