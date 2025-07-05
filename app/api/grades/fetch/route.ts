import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

type GradeResult = {
  id: number;
  class: string;
  grade: number;
  createdAt: Date;
};

export const GET = async (req: NextRequest) => {
  try {
    const grades: GradeResult[] = await prisma.$queryRaw`
      SELECT id, class, grade, "createdAt" FROM grades ORDER BY "createdAt" DESC
    `;

    return NextResponse.json({ grades }, { status: 200 });
  } catch (error) {
    console.error("Error fetching grades with raw SQL:", error);
    return NextResponse.json(
      { error: "Failed to fetch grades with raw SQL." },
      { status: 500 }
    );
  }
};
