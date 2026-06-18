import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        videoUrl: data.videoUrl,
        coverImage: data.coverImage,
      },
    });
    revalidatePath("/admin/portfolio");
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating project" }, { status: 500 });
  }
}
