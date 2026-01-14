import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
  text: string;
}

export default function ViewAllButton({ href, text }: ViewAllButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2
                 text-[#F35029] 
                 hover:text-black
                 transition-colors duration-200
                 font-semibold text-sm
                 group
                 hover:no-underline"
    >
      <span>{text}</span>
      <span className="text-base transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
        ↗
      </span>
    </Link>
  );
}
