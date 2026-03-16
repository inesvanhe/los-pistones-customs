import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";

export const CategoryRouter = Router();

// CRUD-Routen

// Alle Kategorien
CategoryRouter.get("/", getAllCategories);

// Einzelne Kategorie nach ID
CategoryRouter.get("/:id", getCategoryById);

// Neue Kategorie
CategoryRouter.post("/", createCategory);

// Kategorie aktualisieren
CategoryRouter.put("/:id", updateCategory);

// Kategorie löschen
CategoryRouter.delete("/:id", deleteCategory);
