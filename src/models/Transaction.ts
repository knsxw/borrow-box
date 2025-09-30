import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  item: mongoose.Schema.Types.ObjectId;
  borrower: string; // user id / username of borrower
  owner: string; // owner of the item
  status: "pending" | "approved" | "rejected" | "returned";
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  borrower: { type: String, required: true },
  owner: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "returned"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
