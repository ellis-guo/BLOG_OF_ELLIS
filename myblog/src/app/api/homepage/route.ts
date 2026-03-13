import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

// GET - Fetch homepage data
export async function GET() {
  try {
    const homepage = await prisma.homepage.findUnique({
      where: { id: "singleton" },
    });

    if (!homepage) {
      return NextResponse.json(
        { error: "Homepage not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(homepage);
  } catch (error) {
    console.error("Error fetching homepage:", error);
    return NextResponse.json(
      { error: "Failed to fetch homepage" },
      { status: 500 }
    );
  }
}

// PUT - Update homepage data
export async function PUT(request: NextRequest) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const {
      sloganZh,
      sloganEn,
      sloganFr,
      aboutZh,
      aboutEn,
      aboutFr,
      featuredExperienceIds,
      featuredProjectIds,
      featuredPostIds,
    } = body;

    const data = {
      sloganZh: sloganZh ?? "",
      sloganEn: sloganEn ?? "",
      sloganFr: sloganFr ?? "",
      aboutZh: aboutZh ?? "",
      aboutEn: aboutEn ?? "",
      aboutFr: aboutFr ?? "",
      featuredExperienceIds: featuredExperienceIds ?? [],
      featuredProjectIds: featuredProjectIds ?? [],
      featuredPostIds: featuredPostIds ?? [],
    };

    const homepage = await prisma.homepage.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });

    return NextResponse.json({
      success: true,
      homepage,
    });
  } catch (error) {
    console.error("Error updating homepage:", error);
    return NextResponse.json(
      { error: "Failed to update homepage" },
      { status: 500 }
    );
  }
}
