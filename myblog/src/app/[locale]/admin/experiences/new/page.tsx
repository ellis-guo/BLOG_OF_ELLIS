"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function NewExperiencePage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  // Form state
  const [titleZh, setTitleZh] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [descriptionZh, setDescriptionZh] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [order, setOrder] = useState("0");

  // UI state
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!titleZh || !titleEn || !titleFr || !organization || !startDate) {
      setMessage("Please fill in all required fields");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titleZh,
          titleEn,
          titleFr,
          organization,
          location: location || null,
          descriptionZh,
          descriptionEn,
          descriptionFr,
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
          startDate,
          endDate: endDate || null,
          order: parseInt(order),
        }),
      });

      if (response.ok) {
        setMessage("Experience created successfully!");
        setTimeout(() => {
          router.push(`/${locale}/admin/experiences`);
        }, 1000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to create experience");
      }
    } catch (error) {
      console.error("Error creating experience:", error);
      setMessage("Failed to create experience");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">New Experience</h1>
        <Link
          href={`/${locale}/admin/experiences`}
          className="px-6 py-3 border-2 border-black bg-white hover:bg-gray-100 transition-all font-semibold hover:!no-underline hover:!text-black"
        >
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📋 Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organization */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Organization/Company *
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
                placeholder="Northeastern University"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
                placeholder="Boston, MA"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty for "Present"
              </p>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
                placeholder="0"
              />
              <p className="text-sm text-gray-500 mt-1">
                Lower numbers appear first
              </p>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="React, TypeScript, Next.js"
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
              placeholder="软件工程师"
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
              placeholder="Software Engineer"
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
              placeholder="Ingénieur logiciel"
              required
            />
          </div>
        </div>

        {/* Descriptions Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📄 Descriptions
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Chinese Description (中文描述)
            </label>
            <textarea
              value={descriptionZh}
              onChange={(e) => setDescriptionZh(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="描述这段经历..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              English Description
            </label>
            <textarea
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Describe this experience..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              French Description (Description française)
            </label>
            <textarea
              value={descriptionFr}
              onChange={(e) => setDescriptionFr(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Décrivez cette expérience..."
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
            {saving ? "Saving..." : "Create Experience"}
          </button>

          <Link
            href={`/${locale}/admin/experiences`}
            className="px-8 py-3 border-2 border-black bg-white hover:bg-gray-100 transition-all font-semibold inline-block text-center hover:!no-underline hover:!text-black"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
