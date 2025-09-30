import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function POST(req: Request) {
  await connectDB();
  const { itemId, borrower, owner } = await req.json();

  const transaction = new Transaction({ item: itemId, borrower, owner });
  await transaction.save();

  return NextResponse.json({ message: "Borrow request created", transaction });
}

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const borrower = searchParams.get("borrower");

  if (!owner && !borrower) {
    return NextResponse.json(
      { error: "Provide owner or borrower query parameter" },
      { status: 400 }
    );
  }

  // Build query based on which parameter exists
  const query: any = {};
  if (owner) query.owner = owner;
  if (borrower) query.borrower = borrower;

  // Populate the item field so you can access title, image, description
  const transactions = await Transaction.find(query).populate("item");

  return NextResponse.json(transactions);
}
