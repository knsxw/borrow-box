import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// GET user by id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const user = await User.findById(params.id);
  return NextResponse.json(user);
}

// PUT update user
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const user = await User.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(user);
}

// DELETE remove user
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted" });
}
