import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
    });
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Error fetching project" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    try {
      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          category: data.category,
          videoUrl: data.videoUrl,
          coverImage: data.coverImage,
        },
      });
      
      try {
        revalidatePath("/admin/portfolio");
        revalidatePath("/");
      } catch (e) {
        console.error("Revalidate error:", e);
      }
      
      return NextResponse.json(updatedProject);
    } catch (dbError) {
      console.error("DB Update error:", dbError);
      return NextResponse.json({ error: "Project not found or could not be updated" }, { status: 404 });
    }
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Error updating project" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    try {
      await prisma.project.delete({
        where: { id },
      });
    } catch (dbError) {
      console.error("DB Delete error:", dbError);
      // If it doesn't exist, we consider it deleted anyway to avoid 500s on ephemeral DBs
    }
    
    try {
      revalidatePath("/admin/portfolio");
      revalidatePath("/");
    } catch (e) {
      console.error("Revalidate error:", e);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Error deleting project", details: String(error) }, { status: 500 });
  }
}
