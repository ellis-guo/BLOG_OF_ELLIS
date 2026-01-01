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
    <Link href={href} className="block group hover:!no-underline">
      <div className="mb-8">
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
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
