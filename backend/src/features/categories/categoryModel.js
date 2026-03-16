import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Der Kategoriename ist erforderlich"],
    trim: true,
    unique: true,
  },
});

export const CategoryModel = model("Category", categorySchema, "categories");
