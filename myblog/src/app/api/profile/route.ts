import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

// GET - Read profile data
export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: "singleton" },
    });

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
    if (!(await isAdmin())) {
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

    const data = {
      bioZh: bioZh ?? "",
      bioEn: bioEn ?? "",
      bioFr: bioFr ?? "",
      email: email ?? null,
      github: github ?? null,
      linkedin: linkedin ?? null,
      twitter: twitter ?? null,
      wechat: wechat ?? null,
      photoUrl: photoUrl ?? null,
    };

    const profile = await prisma.profile.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });

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
