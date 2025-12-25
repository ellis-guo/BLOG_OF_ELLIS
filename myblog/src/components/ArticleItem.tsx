"use client";

import Link from "next/link";

interface ArticleItemProps {
  id: string; // Article ID for edit link
  title: string;
  date: string;
  category: string;
  description?: string;
  href: string;
  isAdmin?: boolean; // Whether current user is admin
  locale: string; // Current locale for edit link
}

export default function ArticleItem({
  id,
  title,
  date,
  category,
  description,
  href,
  isAdmin = false,
  locale,
}: ArticleItemProps) {
  return (
    <article className="border-b border-[#e5e5e5] last:border-0 relative group">
      {/* Main article link */}
      <Link
        href={href}
        className="block py-6 px-4 -mx-4 transition-colors hover:bg-[#f35029] [&:hover]:!no-underline"
      >
        <h3 className="text-2xl text-[#000] mb-2 transition-colors group-hover:text-white">
          {title}
        </h3>
        <div className="text-sm text-[#999] mb-2 transition-colors group-hover:text-white/90">
          {date} • {category}
        </div>
        {description && (
          <p className="text-base text-[#555] leading-relaxed transition-colors group-hover:text-white/95">
            {description}
          </p>
        )}
      </Link>

      {/* Admin-only Edit button - appears on hover */}
      {isAdmin && (
        <Link
          href={`/${locale}/admin/articles/${id}/edit`}
          className="absolute top-6 right-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-[#F35029] hover:text-white hover:border-[#F35029] transition-all text-sm font-semibold opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()} // Prevent triggering parent link
        >
          Edit
        </Link>
      )}
    </article>
  );
}
