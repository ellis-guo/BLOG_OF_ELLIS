"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import Link from "next/link";

interface LifeMoment {
  id: string;
  imageUrl: string;
  caption: string | null;
  intro: string | null;
  time: Date;
}

interface LifeMomentsSliderProps {
  moments: LifeMoment[];
  isAdmin?: boolean;
  locale?: string;
}

export default function LifeMomentsSlider({
  moments,
  isAdmin = false,
  locale = "en",
}: LifeMomentsSliderProps) {
  const testimonials = moments.map((moment) => ({
    quote: moment.intro || moment.caption || "A beautiful moment in life",
    name: moment.caption || "Life Moment",
    designation: new Date(moment.time).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    src: moment.imageUrl,
  }));

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No life moments to display yet...
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatedTestimonials testimonials={testimonials} autoplay={false} />

      {/* Admin Manage Button - positioned below, to the right of arrows */}
      {isAdmin && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-4">
            <div className="w-50"></div>
            <Link
              href={`/${locale}/admin/moments/edit`}
              className="inline-block px-6 py-3 border-2 border-black bg-white hover:bg-[#F35029] hover:!text-white hover:border-[#F35029] transition-all font-semibold"
            >
              Manage Moments
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
