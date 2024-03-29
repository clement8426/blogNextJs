import { Post } from "@/types";
import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

const POST: Post = {
  id: 1,
  category: "React",
  title: "React State Management: Choosing the Right Solution",
  image: "/react-state-management.jpg",
  caption:
    "Explore different state management solutions in React and choose the one that fits your needs.",
  date: "2023-01-15",
  minutesToRead: 10,
  author: "John ReactDev",
  nbViews: 25,
  nbComments: 8,
  slug: "react-state-management-choosing-right-solution",
  content: "Hello World!",
};

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { view: { increment: 1 } },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
};
