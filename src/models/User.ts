import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
