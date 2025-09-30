import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { status } = await req.json();

  const transaction = await Transaction.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  );

  if (!transaction)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Updated", transaction });
}
