"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Article {
  id: string;
  titleEn: string;
  type: string;
}

interface Experience {
  id: string;
  titleEn: string;
  organization: string;
}

export default function EditHomepagePage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  // Form state
  const [sloganZh, setSloganZh] = useState("");
  const [sloganEn, setSloganEn] = useState("");
  const [sloganFr, setSloganFr] = useState("");
  const [aboutZh, setAboutZh] = useState("");
  const [aboutEn, setAboutEn] = useState("");
  const [aboutFr, setAboutFr] = useState("");
  const [featuredExperienceIds, setFeaturedExperienceIds] = useState<string[]>(
    []
  );
  const [featuredProjectIds, setFeaturedProjectIds] = useState<string[]>([]);
  const [featuredPostIds, setFeaturedPostIds] = useState<string[]>([]);

  // Available data
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Article[]>([]);
  const [posts, setPosts] = useState<Article[]>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch homepage data
        const homepageRes = await fetch("/api/homepage");
        if (homepageRes.ok) {
          const data = await homepageRes.json();
          setSloganZh(data.sloganZh || "");
          setSloganEn(data.sloganEn || "");
          setSloganFr(data.sloganFr || "");
          setAboutZh(data.aboutZh || "");
          setAboutEn(data.aboutEn || "");
          setAboutFr(data.aboutFr || "");
          setFeaturedExperienceIds(data.featuredExperienceIds || []);
          setFeaturedProjectIds(data.featuredProjectIds || []);
          setFeaturedPostIds(data.featuredPostIds || []);
        }

        // Fetch experiences
        const experiencesRes = await fetch("/api/experiences");
        if (experiencesRes.ok) {
          const data = await experiencesRes.json();
          setExperiences(data);
        }

        // Fetch articles
        const articlesRes = await fetch("/api/articles");
        if (articlesRes.ok) {
          const articles = await articlesRes.json();
          setProjects(articles.filter((a: Article) => a.type === "project"));
          setPosts(articles.filter((a: Article) => a.type === "post"));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/homepage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sloganZh,
          sloganEn,
          sloganFr,
          aboutZh,
          aboutEn,
          aboutFr,
          featuredExperienceIds,
          featuredProjectIds,
          featuredPostIds,
        }),
      });

      if (response.ok) {
        setMessage("Homepage updated successfully!");
        setTimeout(() => {
          router.push(`/${locale}`);
        }, 1000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update homepage");
      }
    } catch (error) {
      console.error("Error updating homepage:", error);
      setMessage("Failed to update homepage");
    } finally {
      setSaving(false);
    }
  };

  // Handle checkbox toggles
  const handleExperienceToggle = (id: string) => {
    setFeaturedExperienceIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const handleProjectToggle = (id: string) => {
    setFeaturedProjectIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handlePostToggle = (id: string) => {
    setFeaturedPostIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
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
        <h1 className="text-4xl">Edit Homepage</h1>
        <Link
          href={`/${locale}`}
          className="px-6 py-3 border-2 border-black bg-white hover:bg-gray-100 transition-all font-semibold hover:!no-underline hover:!text-black"
        >
          Back to Homepage
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Slogan Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            💬 Slogan (One-liner)
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Chinese Slogan (中文标语)
            </label>
            <input
              type="text"
              value={sloganZh}
              onChange={(e) => setSloganZh(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="构建现代化的全栈 Web 应用"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              English Slogan
            </label>
            <input
              type="text"
              value={sloganEn}
              onChange={(e) => setSloganEn(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Building modern full-stack web applications"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              French Slogan (Slogan français)
            </label>
            <input
              type="text"
              value={sloganFr}
              onChange={(e) => setSloganFr(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Construire des applications web full-stack modernes"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📝 About Section (Detailed Intro)
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Chinese About (中文介绍)
            </label>
            <textarea
              value={aboutZh}
              onChange={(e) => setAboutZh(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="详细介绍你自己..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              English About
            </label>
            <textarea
              value={aboutEn}
              onChange={(e) => setAboutEn(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Tell us about yourself in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              French About (À propos en français)
            </label>
            <textarea
              value={aboutFr}
              onChange={(e) => setAboutFr(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Parlez-nous de vous en détail..."
            />
          </div>
        </div>

        {/* Featured Experiences */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            💼 Featured Experiences
          </h2>
          <p className="text-sm text-gray-600">
            Select which experiences to display on homepage
          </p>

          {experiences.length === 0 ? (
            <p className="text-gray-400 italic">
              No experiences yet. Create some first!
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto border-2 border-gray-200 p-4">
              {experiences.map((exp) => (
                <label
                  key={exp.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={featuredExperienceIds.includes(exp.id)}
                    onChange={() => handleExperienceToggle(exp.id)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">{exp.titleEn}</span>
                  <span className="text-sm text-gray-500">
                    @ {exp.organization}
                  </span>
                </label>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500">
            Selected: {featuredExperienceIds.length}
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            🚀 Featured Projects
          </h2>
          <p className="text-sm text-gray-600">
            Select which projects to display on homepage
          </p>

          {projects.length === 0 ? (
            <p className="text-gray-400 italic">
              No projects yet. Create some first!
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto border-2 border-gray-200 p-4">
              {projects.map((project) => (
                <label
                  key={project.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={featuredProjectIds.includes(project.id)}
                    onChange={() => handleProjectToggle(project.id)}
                    className="w-4 h-4"
                  />
                  <span>{project.titleEn}</span>
                </label>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500">
            Selected: {featuredProjectIds.length}
          </p>
        </div>

        {/* Featured Posts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            ✍️ Featured Posts
          </h2>
          <p className="text-sm text-gray-600">
            Select which posts to display on homepage
          </p>

          {posts.length === 0 ? (
            <p className="text-gray-400 italic">
              No posts yet. Create some first!
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto border-2 border-gray-200 p-4">
              {posts.map((post) => (
                <label
                  key={post.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={featuredPostIds.includes(post.id)}
                    onChange={() => handlePostToggle(post.id)}
                    className="w-4 h-4"
                  />
                  <span>{post.titleEn}</span>
                </label>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-500">
            Selected: {featuredPostIds.length}
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

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 border-2 !border-black !bg-[#F35029] !text-white hover:!bg-[#d64520] disabled:!bg-gray-400 disabled:!border-gray-400 transition-all font-semibold hover:!no-underline"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <Link
            href={`/${locale}`}
            className="px-8 py-3 border-2 border-black bg-white hover:bg-gray-100 transition-all font-semibold inline-block text-center hover:!no-underline hover:!text-black"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
