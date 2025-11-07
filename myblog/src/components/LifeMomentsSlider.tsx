"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

interface LifeMoment {
  id: string;
  imageUrl: string;
  caption: string | null;
  intro: string | null;
  time: Date;
}

interface LifeMomentsSliderProps {
  moments: LifeMoment[];
}

export default function LifeMomentsSlider({ moments }: LifeMomentsSliderProps) {
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

  return <AnimatedTestimonials testimonials={testimonials} autoplay={false} />;
}
