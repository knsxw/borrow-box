import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Item } from "@/models/Item";
import { mockItems } from "@/lib/mock-data"; // move your mock data to /lib

export async function POST() {
  try {
    await connectDB();

    // Prevent duplicates if already seeded
    const count = await Item.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: "Items already seeded" });
    }

    await Item.insertMany(mockItems.map(({ id, ...rest }) => rest)); // remove custom id

    return NextResponse.json({ message: "Items seeded successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
