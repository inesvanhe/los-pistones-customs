import { ServiceModel } from "./service.model.js";
import { AnswerCreator } from "../../lib/AnswerCreator.js";

// Alle Services
export async function getAllServices(req, res, next) {
  try {
    const services = await ServiceModel.find().populate("category", "name");
    res.json(AnswerCreator(200, services));
  } catch (err) {
    next(err);
  }
}

// Einzelnen Service nach ID
export async function getServiceById(req, res, next) {
  try {
    const service = await ServiceModel.findById(req.params.id).populate(
      "category",
      "name",
    );
    if (!service)
      return next({ status: 404, message: "Service nicht gefunden" });
    res.json(AnswerCreator(200, service));
  } catch (err) {
    next(err);
  }
}

// Neuer Service
export async function createService(req, res, next) {
  try {
    const { name, price, description, category } = req.body;
    const newService = await ServiceModel.create({
      name,
      price,
      description,
      category,
    });
    const populatedService = await newService.populate("category", "name"); // Kategorie direkt mitliefern
    res.status(201).json(AnswerCreator(201, populatedService));
  } catch (err) {
    next(err);
  }
}

// Service aktualisieren
export async function updateService(req, res, next) {
  try {
    const updated = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).populate("category", "name");

    if (!updated)
      return next({ status: 404, message: "Service nicht gefunden" });
    res.json(AnswerCreator(200, updated));
  } catch (err) {
    next(err);
  }
}

// Service löschen
export async function deleteService(req, res, next) {
  try {
    const deleted = await ServiceModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return next({ status: 404, message: "Service nicht gefunden" });
    res.json(AnswerCreator(200, "Service erfolgreich gelöscht"));
  } catch (err) {
    next(err);
  }
}
