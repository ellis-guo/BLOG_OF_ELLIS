import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET - Fetch articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // If ID provided, fetch single article
    if (id) {
      const article = await prisma.article.findUnique({
        where: { id },
      });

      if (!article) {
        return NextResponse.json(
          { error: "Article not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(article);
    }

    // Otherwise, fetch all articles
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// POST - Create new article
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
      slug,
      type,
      titleZh,
      titleEn,
      titleFr,
      descriptionZh,
      descriptionEn,
      descriptionFr,
      contentZh,
      contentEn,
      contentFr,
      author,
      coverImage,
      visibility,
    } = body;

    // Validate required fields
    if (!slug || !titleZh || !titleEn || !titleFr) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.article.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    // Create article
    const article = await prisma.article.create({
      data: {
        slug,
        type: type || "post",
        titleZh,
        titleEn,
        titleFr,
        descriptionZh: descriptionZh || null,
        descriptionEn: descriptionEn || null,
        descriptionFr: descriptionFr || null,
        contentZh: contentZh || "",
        contentEn: contentEn || "",
        contentFr: contentFr || "",
        author: author || "Ellis Guo (郭世越)",
        coverImage: coverImage || null,
        visibility: visibility || "public",
      },
    });

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

// PUT - Update article
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
      slug,
      type,
      titleZh,
      titleEn,
      titleFr,
      descriptionZh,
      descriptionEn,
      descriptionFr,
      contentZh,
      contentEn,
      contentFr,
      author,
      coverImage,
      visibility,
    } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    // Check if article exists
    const existing = await prisma.article.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Update article
    const article = await prisma.article.update({
      where: { id },
      data: {
        slug: slug || existing.slug,
        type: type || existing.type,
        titleZh: titleZh || existing.titleZh,
        titleEn: titleEn || existing.titleEn,
        titleFr: titleFr || existing.titleFr,
        descriptionZh:
          descriptionZh !== undefined ? descriptionZh : existing.descriptionZh,
        descriptionEn:
          descriptionEn !== undefined ? descriptionEn : existing.descriptionEn,
        descriptionFr:
          descriptionFr !== undefined ? descriptionFr : existing.descriptionFr,
        contentZh: contentZh || existing.contentZh,
        contentEn: contentEn || existing.contentEn,
        contentFr: contentFr || existing.contentFr,
        author: author || existing.author,
        coverImage: coverImage !== undefined ? coverImage : existing.coverImage,
        visibility: visibility || existing.visibility,
      },
    });

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

// DELETE - Delete article
export async function DELETE(request: NextRequest) {
  try {
    // Check if user is admin
    const user = await currentUser();
    if (user?.username !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get article ID from URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    // Delete article
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
