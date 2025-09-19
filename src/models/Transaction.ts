import mongoose, { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema(
  {
    item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    borrower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ["ongoing", "returned"], default: "ongoing" },
  },
  { timestamps: true }
);

export default models.Transaction || model("Transaction", TransactionSchema);
