interface HomepageExperienceItemProps {
  title: string;
  organization: string;
  location?: string;
  description: string;
  tags: string[];
  startDate: Date;
  endDate?: Date | null;
}

export default function HomepageExperienceItem({
  title,
  organization,
  location,
  description,
  tags,
  startDate,
  endDate,
}: HomepageExperienceItemProps) {
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="group relative -ml-4 pl-4 py-4 border-l-4 border-transparent lg:hover:border-l-[#F35029] lg:hover:bg-[#F35029]/3 lg:hover:pl-6 transition-all duration-200 cursor-default">
      {/* Time period */}
      <div className="text-sm text-gray-500 mb-1">
        {formatDate(startDate)} — {endDate ? formatDate(endDate) : "Present"}
      </div>

      {/* Title and Organization */}
      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#F35029] transition-colors">
        {title}
      </h3>
      <div className="text-base text-gray-600 mb-3">
        {organization}
        {location && ` · ${location}`}
      </div>

      {/* Description */}
      <p className="text-base text-gray-700 leading-relaxed mb-4">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
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
    </div>
  );
}
