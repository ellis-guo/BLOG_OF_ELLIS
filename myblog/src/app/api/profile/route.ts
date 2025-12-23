import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET - Read profile data
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT - Update profile data
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
      bioZh,
      bioEn,
      bioFr,
      email,
      github,
      linkedin,
      twitter,
      wechat,
      photoUrl,
    } = body;

    // Find existing profile
    let profile = await prisma.profile.findFirst();

    if (!profile) {
      // Create new profile if doesn't exist
      profile = await prisma.profile.create({
        data: {
          bioZh: bioZh || "",
          bioEn: bioEn || "",
          bioFr: bioFr || "",
          email: email || null,
          github: github || null,
          linkedin: linkedin || null,
          twitter: twitter || null,
          wechat: wechat || null,
          photoUrl: photoUrl || null,
        },
      });
    } else {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          bioZh: bioZh || "",
          bioEn: bioEn || "",
          bioFr: bioFr || "",
          email: email || null,
          github: github || null,
          linkedin: linkedin || null,
          twitter: twitter || null,
          wechat: wechat || null,
          photoUrl: photoUrl || null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
