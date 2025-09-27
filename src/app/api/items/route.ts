import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Item } from "@/models/Item";

export async function GET() {
  await connectDB();
  const items = await Item.find();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await connectDB();
  const { title, description, category, location, duration, image, owner } =
    await req.json();

  if (!owner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = await Item.create({
    title,
    description,
    category,
    location,
    duration,
    image,
    owner,
    available: true,
  });

  return NextResponse.json({ message: "Item created", item });
}
