import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET - Fetch homepage data
export async function GET() {
  try {
    const homepage = await prisma.homepage.findFirst();

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
    const user = await currentUser();
    if (user?.username !== "admin") {
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
      featuredProjectIds,
      featuredPostIds,
    } = body;

    // Find existing homepage
    let homepage = await prisma.homepage.findFirst();

    if (!homepage) {
      // Create new homepage if doesn't exist
      homepage = await prisma.homepage.create({
        data: {
          sloganZh: sloganZh || "",
          sloganEn: sloganEn || "",
          sloganFr: sloganFr || "",
          aboutZh: aboutZh || "",
          aboutEn: aboutEn || "",
          aboutFr: aboutFr || "",
          featuredProjectIds: featuredProjectIds || [],
          featuredPostIds: featuredPostIds || [],
        },
      });
    } else {
      // Update existing homepage
      homepage = await prisma.homepage.update({
        where: { id: homepage.id },
        data: {
          sloganZh: sloganZh !== undefined ? sloganZh : homepage.sloganZh,
          sloganEn: sloganEn !== undefined ? sloganEn : homepage.sloganEn,
          sloganFr: sloganFr !== undefined ? sloganFr : homepage.sloganFr,
          aboutZh: aboutZh !== undefined ? aboutZh : homepage.aboutZh,
          aboutEn: aboutEn !== undefined ? aboutEn : homepage.aboutEn,
          aboutFr: aboutFr !== undefined ? aboutFr : homepage.aboutFr,
          featuredProjectIds:
            featuredProjectIds !== undefined
              ? featuredProjectIds
              : homepage.featuredProjectIds,
          featuredPostIds:
            featuredPostIds !== undefined
              ? featuredPostIds
              : homepage.featuredPostIds,
        },
      });
    }

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
