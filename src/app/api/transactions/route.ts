import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

// GET all transactions
export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().populate(
    "item borrower lender"
  );
  return NextResponse.json(transactions);
}

// POST create transaction
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const transaction = await Transaction.create(body);
  return NextResponse.json(transaction, { status: 201 });
}
