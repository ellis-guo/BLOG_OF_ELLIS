import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET - Fetch experiences
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // If ID provided, fetch single experience
    if (id) {
      const experience = await prisma.experience.findUnique({
        where: { id },
      });

      if (!experience) {
        return NextResponse.json(
          { error: "Experience not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(experience);
    }

    // Otherwise, fetch all experiences
    const experiences = await prisma.experience.findMany({
      orderBy: {
        startDate: "desc",
      },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

// POST - Create new experience
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await currentUser();
    if (user?.username !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const {
      titleZh,
      titleEn,
      titleFr,
      organization,
      location,
      descriptionZh,
      descriptionEn,
      descriptionFr,
      tags,
      startDate,
      endDate,
      order,
    } = body;

    // Validate required fields
    if (!titleZh || !titleEn || !titleFr || !organization) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create experience
    const experience = await prisma.experience.create({
      data: {
        titleZh,
        titleEn,
        titleFr,
        organization,
        location: location || null,
        descriptionZh: descriptionZh || "",
        descriptionEn: descriptionEn || "",
        descriptionFr: descriptionFr || "",
        tags: tags || [],
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        order: order || 0,
      },
    });

    return NextResponse.json({
      success: true,
      experience,
    });
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

// PUT - Update experience
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
      id,
      titleZh,
      titleEn,
      titleFr,
      organization,
      location,
      descriptionZh,
      descriptionEn,
      descriptionFr,
      tags,
      startDate,
      endDate,
      order,
    } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      );
    }

    // Check if experience exists
    const existing = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    // Update experience
    const experience = await prisma.experience.update({
      where: { id },
      data: {
        titleZh: titleZh || existing.titleZh,
        titleEn: titleEn || existing.titleEn,
        titleFr: titleFr || existing.titleFr,
        organization: organization || existing.organization,
        location: location !== undefined ? location : existing.location,
        descriptionZh: descriptionZh || existing.descriptionZh,
        descriptionEn: descriptionEn || existing.descriptionEn,
        descriptionFr: descriptionFr || existing.descriptionFr,
        tags: tags || existing.tags,
        startDate: startDate ? new Date(startDate) : existing.startDate,
        endDate:
          endDate !== undefined
            ? endDate
              ? new Date(endDate)
              : null
            : existing.endDate,
        order: order !== undefined ? order : existing.order,
      },
    });

    return NextResponse.json({
      success: true,
      experience,
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

// DELETE - Delete experience
export async function DELETE(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await currentUser();
    if (user?.username !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get experience ID from URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      );
    }

    // Delete experience
    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
