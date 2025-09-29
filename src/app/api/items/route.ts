import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Item } from "@/models/Item";

export async function GET() {
  await connectDB();
  const items = await Item.find();
  return NextResponse.json(
    items.map((i) => ({
      id: i._id.toString(), // 👈 normalize _id → id
      title: i.title,
      description: i.description,
      category: i.category,
      location: i.location,
      duration: i.duration,
      owner: i.owner,
      image: i.image,
      available: i.available,
    }))
  );
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
