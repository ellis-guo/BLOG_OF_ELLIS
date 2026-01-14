import Link from "next/link";

interface HomepageArticleItemProps {
  title: string;
  date: Date;
  description?: string;
  tags?: string[];
  href: string;
}

export default function HomepageArticleItem({
  title,
  date,
  description,
  tags,
  href,
}: HomepageArticleItemProps) {
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group -ml-4 pl-4 py-4 border-l-4 border-transparent lg:hover:border-l-[#F35029] lg:hover:bg-[#F35029]/3 lg:hover:pl-6 transition-all duration-200 lg:hover:!no-underline"
    >
      {/* Title */}
      <h3 className="text-xl font-semibold mb-1 group-hover:text-[#F35029] transition-colors">
        {title}
      </h3>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-2">{formatDate(date)}</p>

      {/* Description */}
      {description && (
        <p className="text-base text-gray-700 mb-3">{description}</p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded lg:group-hover:bg-[#F35029]/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
