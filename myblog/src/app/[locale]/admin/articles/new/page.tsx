"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

// Import SimpleMDE dynamically (client-side only)
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function NewArticlePage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  // Form state
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("post");
  const [author, setAuthor] = useState("郭世越 Ellis Guo");
  const [coverImage, setCoverImage] = useState("");
  const [visibility, setVisibility] = useState("public");

  const [titleZh, setTitleZh] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleFr, setTitleFr] = useState("");

  const [descriptionZh, setDescriptionZh] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");

  const [contentZh, setContentZh] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentFr, setContentFr] = useState("");

  // UI state
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Memoize SimpleMDE options to prevent re-initialization bug
  const editorOptions = useMemo(
    () => ({
      spellChecker: false,
      status: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "guide",
      ] as const,
    }),
    []
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!slug || !titleZh || !titleEn || !titleFr) {
      setMessage("Please fill in all required fields (slug and titles)");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
          coverImage: coverImage || null,
          visibility,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Article created successfully!");

        // Redirect after 1 second
        setTimeout(() => {
          router.push(`/${locale}/admin/articles`);
        }, 1000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
      setMessage("Failed to create article");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">New Article</h1>
        <Link
          href={`/${locale}/admin/articles`}
          className="px-6 py-3 border-2 border-black bg-white hover:bg-gray-100 transition-all font-semibold hover:!no-underline hover:!text-black"
        >
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📝 Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Slug (URL path) *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
                placeholder="my-article-slug"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                URL: /articles/{slug || "..."}
              </p>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              >
                <option value="post">Post (Blog)</option>
                <option value="project">Project</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold mb-2">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              />
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Visibility
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              >
                <option value="public">Public</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Cover Image URL (optional)
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Titles Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📌 Titles (3 Languages)
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Chinese Title (中文标题) *
            </label>
            <input
              type="text"
              value={titleZh}
              onChange={(e) => setTitleZh(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="我的文章标题"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              English Title *
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="My Article Title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              French Title (Titre français) *
            </label>
            <input
              type="text"
              value={titleFr}
              onChange={(e) => setTitleFr(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Mon titre d'article"
              required
            />
          </div>
        </div>

        {/* Descriptions Section - NEW */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📄 Descriptions (Optional)
          </h2>
          <p className="text-sm text-gray-600">
            Short summary for article list. Leave empty to auto-generate from
            content.
          </p>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Chinese Description (中文简介)
            </label>
            <textarea
              value={descriptionZh}
              onChange={(e) => setDescriptionZh(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="简短描述这篇文章的内容..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              English Description
            </label>
            <textarea
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Brief summary of this article..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              French Description (Description française)
            </label>
            <textarea
              value={descriptionFr}
              onChange={(e) => setDescriptionFr(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Brève description de cet article..."
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            ✍️ Content (Markdown)
          </h2>

          {/* Chinese Content */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Chinese Content (中文正文)
            </label>
            <SimpleMDE
              value={contentZh}
              onChange={setContentZh}
              options={editorOptions}
            />
          </div>

          {/* English Content */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              English Content
            </label>
            <SimpleMDE
              value={contentEn}
              onChange={setContentEn}
              options={editorOptions}
            />
          </div>

          {/* French Content */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              French Content (Contenu français)
            </label>
            <SimpleMDE
              value={contentFr}
              onChange={setContentFr}
              options={editorOptions}
            />
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`p-4 border-2 ${
              message.includes("success")
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-red-500 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 border-2 !border-black !bg-[#F35029] !text-white hover:!bg-[#d64520] disabled:!bg-gray-400 disabled:!border-gray-400 transition-all font-semibold hover:!no-underline"
          >
            {saving ? "Saving..." : "Create Article"}
          </button>

          <Link
            href={`/${locale}/admin/articles`}
            className="px-8 py-3 border-2 border-black bg-white hover:bg-gray-100 transition-all font-semibold inline-block text-center hover:!no-underline hover:!text-black"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
