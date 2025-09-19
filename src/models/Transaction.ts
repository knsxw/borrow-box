import mongoose, { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema(
  {
    item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    borrower: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "approved", "returned"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Transaction || model("Transaction", TransactionSchema);
