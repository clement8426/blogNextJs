import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req: Request) => {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({ message: "No file" }, { status: 500 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const imageUrl = `/images/${new Date().getTime()}_${file.name}`;
  const imagePath = path.join(process.cwd(), `/public${imageUrl}`);

  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return NextResponse.json({ message: "No file" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
