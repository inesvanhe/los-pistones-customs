import { Schema, model, Types } from "mongoose";

const serviceSchema = new Schema({
  name: {
    type: String,
    required: [true, "Service-Name ist erforderlich"],
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  category: {
    type: Types.ObjectId,
    ref: "Category", // Referenz auf die Category-Collection
    required: [true, "Kategorie ist erforderlich"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const ServiceModel = model("Service", serviceSchema, "services");
