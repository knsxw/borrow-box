import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  borrowedItems: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  lentItems: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

export default models.User || model("User", UserSchema);
