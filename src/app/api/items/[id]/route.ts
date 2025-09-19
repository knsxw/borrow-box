import { NextResponse } from "next/server";
import Item from "@/models/Item";
import { connectDB } from "@/lib/mongodb";

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const updatedItem = await Item.findByIdAndUpdate(
    params.id,
    await req.json(),
    { new: true }
  );
  return NextResponse.json(updatedItem);
}

export async function DELETE(req: Request, { params }: any) {
  await connectDB();
  await Item.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Item deleted" });
}
