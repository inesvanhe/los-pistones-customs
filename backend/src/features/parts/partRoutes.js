import { Router } from "express";
import {
  getAllParts,
  getPartById,
  createPart,
  updatePart,
  deletePart,
} from "./partController.js";

export const PartRouter = Router();

// CRUD-Routen

//Alle Ersatzteile
PartRouter.get("/", getAllParts);

// Ersatzteil nach ID
PartRouter.get("/:id", getPartById);

// Neues Ersatzteil
PartRouter.post("/", createPart);

// Ersatzteil aktualisieren
PartRouter.put("/:id", updatePart);

// Ersatzteil löschen
PartRouter.delete("/:id", deletePart);
