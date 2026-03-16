import { Router } from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "./serviceController.js";

export const ServiceRouter = Router();

// CRUD-Routen

// Alle Services
ServiceRouter.get("/", getAllServices);

// Einzelnen Service
ServiceRouter.get("/:id", getServiceById);

// Neuer Service
ServiceRouter.post("/", createService);

// Service aktualisieren
ServiceRouter.put("/:id", updateService);

// Service löschen
ServiceRouter.delete("/:id", deleteService);
