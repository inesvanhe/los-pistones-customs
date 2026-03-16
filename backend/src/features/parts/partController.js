import { PartModel } from "./partModel.js";
import { AnswerCreator } from "../../lib/AnswerCreator.js";

// Alle Ersatzteile
export async function getAllParts(req, res, next) {
  try {
    const parts = await PartModel.find().populate("category", "name");
    res.json(AnswerCreator(200, parts));
  } catch (err) {
    next(err);
  }
}

// Einzelnes Ersatzteil nach ID
export async function getPartById(req, res, next) {
  try {
    const part = await PartModel.findById(req.params.id).populate(
      "category",
      "name",
    );
    if (!part)
      return next({ status: 404, message: "Ersatzteil nicht gefunden" });
    res.json(AnswerCreator(200, part));
  } catch (err) {
    next(err);
  }
}

// Neues Ersatzteil
export async function createPart(req, res, next) {
  try {
    const { name, price, description, category } = req.body;
    const newPart = await PartModel.create({
      name,
      price,
      description,
      category,
    });
    const populatedPart = await newPart.populate("category", "name");
    res.status(201).json(AnswerCreator(201, populatedPart));
  } catch (err) {
    next(err);
  }
}

// Ersatzteil aktualisieren
export async function updatePart(req, res, next) {
  try {
    const updated = await PartModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category", "name");

    if (!updated)
      return next({ status: 404, message: "Ersatzteil nicht gefunden" });
    res.json(AnswerCreator(200, updated));
  } catch (err) {
    next(err);
  }
}

// Ersatzteil löschen
export async function deletePart(req, res, next) {
  try {
    const deleted = await PartModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return next({ status: 404, message: "Ersatzteil nicht gefunden" });
    res.json(AnswerCreator(200, "Ersatzteil erfolgreich gelöscht"));
  } catch (err) {
    next(err);
  }
}
