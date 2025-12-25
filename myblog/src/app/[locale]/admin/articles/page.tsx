"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Article {
  id: string;
  slug: string;
  type: string;
  titleZh: string;
  titleEn: string;
  titleFr: string;
  author: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
}

export default function ArticlesManagePage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  // State
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch articles on page load
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/articles");
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        setMessage("Failed to load articles");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setMessage("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  // Delete article
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/articles?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Article deleted successfully!");
        fetchArticles(); // Refresh list
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      setMessage("Failed to delete article");
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
        <h1 className="text-4xl">Manage Articles</h1>
        <Link
          href={`/${locale}/admin/articles/new`}
          className="px-6 py-3 border-2 !border-black !bg-[#F35029] !text-white hover:!bg-[#d64520] transition-all font-semibold hover:!no-underline"
        >
          + New Article
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

      {/* Articles list */}
      {articles.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-4">No articles yet</p>
          <p>Click "New Article" to create your first article!</p>
        </div>
      ) : (
        <div className="border-2 border-black">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-black">
              <tr>
                <th className="text-left p-4 font-semibold">Title</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Author</th>
                <th className="text-left p-4 font-semibold">Created</th>
                <th className="text-left p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-gray-200">
                  <td className="p-4">
                    <div className="font-semibold">{article.titleEn}</div>
                    <div className="text-sm text-gray-500">/{article.slug}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        article.type === "project"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {article.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{article.author}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        article.visibility === "public"
                          ? "bg-green-100 text-green-800"
                          : article.visibility === "guest"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {article.visibility}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <Link
                        href={`/${locale}/admin/articles/${article.id}/edit`}
                        className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 transition-all text-sm font-semibold hover:!no-underline hover:!text-black"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(article.id, article.titleEn)
                        }
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
