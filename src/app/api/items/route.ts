import { NextResponse } from "next/server";
import Item from "@/models/Item";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const items = await Item.find();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newItem = await Item.create(data);
  return NextResponse.json(newItem, { status: 201 });
}
