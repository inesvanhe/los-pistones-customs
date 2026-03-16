import { CategoryModel } from "./categoryModel.js";
import { AnswerCreator } from "../../lib/AnswerCreator.js";

// Alle Kategorien
export async function getAllCategories(req, res, next) {
  try {
    const categories = await CategoryModel.find();
    res.json(AnswerCreator(200, categories));
  } catch (err) {
    next(err);
  }
}

// Einzelne Kategorie nach ID
export async function getCategoryById(req, res, next) {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category)
      return next({ status: 404, message: "Kategorie nicht gefunden" });
    res.json(AnswerCreator(200, category));
  } catch (err) {
    next(err);
  }
}

// Neue Kategorie
export async function createCategory(req, res, next) {
  try {
    const { name } = req.body;
    const newCategory = await CategoryModel.create({ name });
    res.status(201).json(AnswerCreator(201, newCategory));
  } catch (err) {
    next(err);
  }
}

// Kategorie aktualisieren
export async function updateCategory(req, res, next) {
  try {
    const updated = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }, // new: gibt die aktualisierte Version zurück, runValidators: prüft die Validierung
    );
    if (!updated)
      return next({ status: 404, message: "Kategorie nicht gefunden" });
    res.json(AnswerCreator(200, updated));
  } catch (err) {
    next(err);
  }
}

// Kategorie löschen
export async function deleteCategory(req, res, next) {
  try {
    const deleted = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return next({ status: 404, message: "Kategorie nicht gefunden" });
    res.json(AnswerCreator(200, "Kategorie erfolgreich gelöscht"));
  } catch (err) {
    next(err);
  }
}
