"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LifeMoment {
  id: string;
  imageUrl: string;
  caption: string | null;
  intro: string | null;
  time: string;
  order: number;
}

export default function EditMomentsPage() {
  const params = useParams();
  const locale = params.locale as string;

  // Moments list
  const [moments, setMoments] = useState<LifeMoment[]>([]);

  // Form state
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [intro, setIntro] = useState("");
  const [time, setTime] = useState("");

  // Status state
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all moments on page load
  useEffect(() => {
    fetchMoments();
  }, []);

  const fetchMoments = async () => {
    try {
      const response = await fetch("/api/moments");
      if (response.ok) {
        const data = await response.json();
        setMoments(data);
      }
    } catch (error) {
      console.error("Error fetching moments:", error);
      setMessage("Failed to load moments");
    } finally {
      setLoading(false);
    }
  };

  // Add new moment
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      setMessage("Image URL is required");
      return;
    }

    setAdding(true);
    setMessage("");

    try {
      const response = await fetch("/api/moments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          caption,
          intro,
          time: time || new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setMessage("Moment added successfully!");
        // Clear form
        setImageUrl("");
        setCaption("");
        setIntro("");
        setTime("");
        // Refresh list
        fetchMoments();
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to add moment");
      }
    } catch (error) {
      console.error("Error adding moment:", error);
      setMessage("Failed to add moment");
    } finally {
      setAdding(false);
    }
  };

  // Delete moment
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this moment?")) {
      return;
    }

    try {
      const response = await fetch(`/api/moments?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Moment deleted successfully!");
        // Refresh list
        fetchMoments();
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to delete moment");
      }
    } catch (error) {
      console.error("Error deleting moment:", error);
      setMessage("Failed to delete moment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1024px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Manage Life Moments</h1>
        <Link
          href={`/${locale}/about`}
          className="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100 transition-all font-semibold"
        >
          Back to About
        </Link>
      </div>

      {/* Existing Moments Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-[#ccc] pb-2">
          📸 Existing Moments ({moments.length})
        </h2>

        {moments.length === 0 ? (
          <p className="text-gray-400 italic">
            No moments yet. Add your first one below!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moments.map((moment) => (
              <div
                key={moment.id}
                className="border-2 border-black bg-white overflow-hidden"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={moment.imageUrl}
                    alt={moment.caption || "Life moment"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">
                    {moment.caption || "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(moment.time).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {moment.intro && (
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {moment.intro}
                    </p>
                  )}
                  <button
                    onClick={() => handleDelete(moment.id)}
                    className="w-full px-4 py-2 border-2 border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Moment Form */}
      <div className="border-t border-[#ccc] pt-8">
        <h2 className="text-2xl font-bold mb-6">➕ Add New Moment</h2>

        <form onSubmit={handleAdd} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Photo URL *
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="https://res.cloudinary.com/..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="A beautiful moment..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Tell the story behind this moment..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Date</label>
            <input
              type="date"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to use today's date
            </p>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={adding}
            className="px-8 py-3 border-2 !border-black !bg-[#F35029] !text-white hover:!bg-[#d64520] disabled:!bg-gray-400 disabled:!border-gray-400 transition-all font-semibold hover:!no-underline"
          >
            {adding ? "Adding..." : "Add Moment"}
          </button>
        </form>
      </div>
    </div>
  );
}
