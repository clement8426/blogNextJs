// /api/categories

import { Category } from "@/types";
import { NextResponse } from "next/server";

// GET POST PUT DELETE

const CATEGORIES: Category[] = [
  { id: 1, name: "React", slug: "react" },
  { id: 2, name: "Next.js", slug: "nextjs" },
  { id: 3, name: "React Native", slug: "react-native" },
  { id: 4, name: "CSS", slug: "css" },
  { id: 5, name: "JavaScript", slug: "javascript" },
];

export const GET = async () => {
  return NextResponse.json(CATEGORIES, { status: 200 });
};
