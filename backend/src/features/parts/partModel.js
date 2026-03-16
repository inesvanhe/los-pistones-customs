import { Schema, model, Types } from "mongoose";

const partSchema = new Schema({
  name: {
    type: String,
    required: [true, "Part-Name ist erforderlich"],
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
    ref: "Category", // Referenz auf Kategorie
    required: [true, "Kategorie ist erforderlich"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const PartModel = model("Part", partSchema, "parts");
