import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET - Get all moments
export async function GET() {
  try {
    const moments = await prisma.lifeMoment.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(moments);
  } catch (error) {
    console.error("Error fetching moments:", error);
    return NextResponse.json(
      { error: "Failed to fetch moments" },
      { status: 500 }
    );
  }
}

// POST - Add new moment
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await currentUser();
    if (user?.username !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { imageUrl, caption, intro, time } = body;

    // Validate required fields
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Get the highest order number
    const lastMoment = await prisma.lifeMoment.findFirst({
      orderBy: { order: "desc" },
    });
    const newOrder = lastMoment ? lastMoment.order + 1 : 0;

    // Create new moment
    const moment = await prisma.lifeMoment.create({
      data: {
        imageUrl,
        caption: caption || null,
        intro: intro || null,
        time: time ? new Date(time) : new Date(),
        order: newOrder,
      },
    });

    return NextResponse.json({
      success: true,
      moment,
    });
  } catch (error) {
    console.error("Error creating moment:", error);
    return NextResponse.json(
      { error: "Failed to create moment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete moment
export async function DELETE(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await currentUser();
    if (user?.username !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get moment ID from URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Moment ID is required" },
        { status: 400 }
      );
    }

    // Delete moment
    await prisma.lifeMoment.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Moment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting moment:", error);
    return NextResponse.json(
      { error: "Failed to delete moment" },
      { status: 500 }
    );
  }
}
