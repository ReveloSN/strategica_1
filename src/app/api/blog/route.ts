import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching blog posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newPost = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        imageUrl: data.imageUrl,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating blog post" }, { status: 500 });
  }
}
