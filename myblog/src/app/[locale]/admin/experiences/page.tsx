"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Experience {
  id: string;
  titleZh: string;
  titleEn: string;
  titleFr: string;
  organization: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  tags: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function ExperiencesManagePage() {
  const params = useParams();
  const locale = params.locale as string;

  // State
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch experiences on page load
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experiences");
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      } else {
        setMessage("Failed to load experiences");
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
      setMessage("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  // Delete experience
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/experiences?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Experience deleted successfully!");
        fetchExperiences();
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      setMessage("Failed to delete experience");
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Manage Experiences</h1>
        <Link
          href={`/${locale}/admin/experiences/new`}
          className="px-6 py-3 border-2 !border-black !bg-[#F35029] !text-white hover:!bg-[#d64520] transition-all font-semibold hover:!no-underline"
        >
          + New Experience
        </Link>
      </div>

      {/* Message display */}
      {message && (
        <div
          className={`p-4 mb-6 border-2 ${
            message.includes("success")
              ? "border-green-500 bg-green-50 text-green-700"
              : "border-red-500 bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Experiences list */}
      {experiences.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-4">No experiences yet</p>
          <p>Click "New Experience" to create your first experience!</p>
        </div>
      ) : (
        <div className="border-2 border-black">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-black">
              <tr>
                <th className="text-left p-4 font-semibold">Title</th>
                <th className="text-left p-4 font-semibold">Organization</th>
                <th className="text-left p-4 font-semibold">Period</th>
                <th className="text-left p-4 font-semibold">Tags</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id} className="border-b border-gray-200">
                  <td className="p-4">
                    <div className="font-semibold">{exp.titleEn}</div>
                    <div className="text-sm text-gray-500">{exp.location}</div>
                  </td>
                  <td className="p-4 text-sm">{exp.organization}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {exp.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {exp.tags.length > 3 && (
                        <span className="px-2 py-1 text-gray-500 text-xs">
                          +{exp.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <Link
                        href={`/${locale}/admin/experiences/${exp.id}/edit`}
                        className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 transition-all text-sm font-semibold hover:!no-underline hover:!text-black"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(exp.id, exp.titleEn)}
                        className="px-4 py-2 border-2 border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
