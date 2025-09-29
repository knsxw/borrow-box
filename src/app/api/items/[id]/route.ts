import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Item } from "@/models/Item";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const { owner, ...updateData } = body;

  const item = await Item.findById(params.id);
  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  // Only owner can edit
  if (item.owner !== owner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  Object.assign(item, updateData);
  await item.save();

  return NextResponse.json({ message: "Item updated", item });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { owner } = await req.json();

  const item = await Item.findById(params.id);
  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  // Only owner can delete
  if (item.owner !== owner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await item.deleteOne();
  return NextResponse.json({ message: "Item deleted" });
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { borrower } = await req.json();

  const item = await Item.findById(params.id);
  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  if (item.owner === borrower) {
    return NextResponse.json(
      { error: "You cannot borrow your own item" },
      { status: 400 }
    );
  }

  if (!item.available) {
    return NextResponse.json({ error: "Item not available" }, { status: 400 });
  }

  item.available = false;
  await item.save();

  return NextResponse.json({ message: "Item borrowed", item });
}
