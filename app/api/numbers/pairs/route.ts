import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

type NumberPair = {
  "ID 1": number;
  "Number 1": number;
  "ID 2": number;
  "Number 2": number;
  Sum: number;
};

export const GET = async (req: NextRequest) => {
  try {
    const pairs: NumberPair[] = await prisma.$queryRaw`
          SELECT
              n1.id AS "ID 1",
              n1.value AS "Number 1",
              n2.id AS "ID 2",
              n2.value AS "Number 2",
              (n1.value + n2.value) AS "Sum"
          FROM
              numbers n1
          JOIN
              numbers n2 ON n1.id = n2.id - 1
          ORDER BY
              n1.id;
        `;

    return NextResponse.json({ pairs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching number pairs:", error);
    return NextResponse.json(
      { error: "Failed to fetch number pairs." },
      { status: 500 }
    );
  }
};
