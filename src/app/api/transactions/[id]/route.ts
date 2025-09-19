import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

// GET transaction by id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const tx = await Transaction.findById(params.id).populate(
    "item borrower lender"
  );
  return NextResponse.json(tx);
}

// PUT update transaction
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const tx = await Transaction.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(tx);
}

// DELETE transaction
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Transaction.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Transaction deleted" });
}
