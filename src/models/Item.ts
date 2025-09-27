import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    owner: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Item = models.Item || model("Item", ItemSchema);
