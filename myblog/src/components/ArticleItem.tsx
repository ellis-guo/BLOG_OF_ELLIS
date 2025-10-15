import Link from "next/link";

interface ArticleItemProps {
  title: string;
  date: string;
  category: string;
  description?: string;
  href: string;
}

export default function ArticleItem({
  title,
  date,
  category,
  description,
  href,
}: ArticleItemProps) {
  return (
    <article className="border-b border-[#e5e5e5] last:border-0">
      <Link
        href={href}
        className="block group py-6 px-4 -mx-4 transition-colors hover:bg-[#f35029] [&:hover]:!no-underline"
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
    </article>
  );
}
