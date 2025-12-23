"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditProfilePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  // Form state
  const [bioZh, setBioZh] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [bioFr, setBioFr] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [wechat, setWechat] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  // Loading and status state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing profile data on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setBioZh(data.bioZh || "");
          setBioEn(data.bioEn || "");
          setBioFr(data.bioFr || "");
          setEmail(data.email || "");
          setGithub(data.github || "");
          setLinkedin(data.linkedin || "");
          setTwitter(data.twitter || "");
          setWechat(data.wechat || "");
          setPhotoUrl(data.photoUrl || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bioZh,
          bioEn,
          bioFr,
          email,
          github,
          linkedin,
          twitter,
          wechat,
          photoUrl,
        }),
      });

      if (response.ok) {
        setMessage("Profile updated successfully!");
        setTimeout(() => {
          router.push(`/${locale}/about`);
        }, 2000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
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
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-4xl mb-8">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Bio Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📝 Personal Bio
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Chinese Bio (中文简介)
            </label>
            <textarea
              value={bioZh}
              onChange={(e) => setBioZh(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="介绍一下你自己..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              English Bio
            </label>
            <textarea
              value={bioEn}
              onChange={(e) => setBioEn(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              French Bio (Biographie en français)
            </label>
            <textarea
              value={bioFr}
              onChange={(e) => setBioFr(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="Parlez-nous de vous..."
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📞 Contact Information
          </h2>

          <div>
            <label className="block text-sm font-semibold mb-2">📧 Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              💻 GitHub Username
            </label>
            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              💼 LinkedIn Username
            </label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              🐦 Twitter Username
            </label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              💬 WeChat ID
            </label>
            <input
              type="text"
              value={wechat}
              onChange={(e) => setWechat(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="WeChat ID"
            />
          </div>
        </div>

        {/* Photo Section (placeholder for now) */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-[#ccc] pb-2">
            📸 Profile Photo
          </h2>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Photo URL
            </label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-[#F35029] transition-colors"
              placeholder="https://..."
            />
            <p className="text-sm text-gray-500 mt-2">
              For now, paste an image URL. Photo upload feature coming soon.
            </p>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`p-4 border-2 ${
              message.includes("success")
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
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
            style={{
              background: saving ? "#9ca3af" : "#F35029",
              border: "2px solid black",
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <Link
            href={`/${locale}/about`}
            className="px-8 py-3 border-2 border-black bg-white hover:bg-gray-100 transition-all font-semibold inline-block text-center hover:!no-underline hover:!text-black"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
