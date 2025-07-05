import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { MAX_GRADE, MIN_GRADE } from "@/constants/grades";

export const POST = async (req: NextRequest) => {
  try {
    const { class: className, grade } = await req.json();

    if (typeof className !== "string" || className.trim() === "") {
      return NextResponse.json(
        { error: "Invalid input: Class name is required." },
        { status: 400 }
      );
    }
    if (
      typeof grade !== "number" ||
      !Number.isInteger(grade) ||
      grade < MIN_GRADE ||
      grade > MAX_GRADE
    ) {
      return NextResponse.json(
        { error: "Invalid input: Grade must be an integer between 0 and 100." },
        { status: 400 }
      );
    }

    await prisma.$executeRaw`
      INSERT INTO grades (class, grade, "createdAt")
      VALUES (${className.trim()}, ${grade}, ${new Date()})
    `;

    return NextResponse.json(
      { message: "Grade added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding grade:", error);
    return NextResponse.json(
      { error: "Failed to add grade." },
      { status: 500 }
    );
  }
};
