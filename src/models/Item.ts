import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default models.Item || model("Item", ItemSchema);
