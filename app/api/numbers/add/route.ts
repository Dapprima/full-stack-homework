import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { value } = await req.json();

    if (typeof value !== "number" || !Number.isInteger(value)) {
      return NextResponse.json(
        { error: "Invalid input: value must be an integer." },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`INSERT INTO numbers (value) VALUES (${value})`;

    return NextResponse.json(
      { message: "Number added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding number:", error);
    return NextResponse.json(
      { error: "Failed to add number." },
      { status: 500 }
    );
  }
};
