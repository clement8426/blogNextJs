// /api/categories

import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

// GET POST PUT DELETE

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};
