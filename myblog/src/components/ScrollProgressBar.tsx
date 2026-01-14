"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate scroll percentage
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;

      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-[48%] top-0 w-[3px] h-screen pointer-events-none z-10 hidden lg:block"
      style={{
        background: `linear-gradient(
          to bottom,
          transparent 0%,
          transparent ${scrollProgress}%,
          transparent ${scrollProgress}%
        )`,
      }}
    >
      <div
        className="w-full transition-all duration-100 ease-out"
        style={{
          height: `${scrollProgress}%`,
          background: "#F35029",
        }}
      />
    </div>
  );
}
