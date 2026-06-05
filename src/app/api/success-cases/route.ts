import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cases = await prisma.successCase.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching success cases" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newCase = await prisma.successCase.create({
      data: {
        clientName: data.clientName,
        initialProblem: data.initialProblem,
        strategyApplied: data.strategyApplied,
        results: data.results,
        metrics: data.metrics,
      },
    });
    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating success case" }, { status: 500 });
  }
}
