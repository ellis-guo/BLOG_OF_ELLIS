"use client";

import Link from "next/link";

interface ArticleItemProps {
  id: string;
  title: string;
  date: string;
  category: string;
  description?: string;
  href: string;
  isAdmin?: boolean;
  locale: string;
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
        className="block py-6 px-4 -mx-4 transition-colors hover:bg-[#f35029] has-[a:hover]:bg-transparent [&:hover]:!no-underline [&:hover_h3]:text-white [&:hover_div]:text-white [&:hover_p]:text-white"
      >
        <h3 className="text-2xl text-[#000] mb-2 transition-colors">{title}</h3>
        <div className="text-sm text-[#999] mb-2 transition-colors">
          {date} • {category}
        </div>
        {description && (
          <p className="text-base text-[#555] leading-relaxed transition-colors">
            {description}
          </p>
        )}
      </Link>

      {/* Admin-only Edit button */}
      {isAdmin && (
        <Link
          href={`/${locale}/admin/articles/${id}/edit`}
          className="absolute top-6 right-4 px-4 py-2 border-2 border-black bg-white text-black hover:bg-[#F35029] hover:!text-white hover:border-[#F35029] transition-all text-sm font-semibold opacity-0 group-hover:opacity-100 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Link>
      )}
    </article>
  );
}
