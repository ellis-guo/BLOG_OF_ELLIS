"use client";

import { useEffect, useState } from "react";

export default function AnimatedSignatureLogo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative inline-block">
      <div
        className="transition-all duration-[1500ms] ease-out"
        style={{
          clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        }}
      >
        {/* <img
          src="/signatures/signature_2.svg"
          alt="郭世越 Ellis Guo"
          width={250}
          height={62}
          className="block"
        /> */}

        <div
          className="transition-all duration-[1500ms] ease-out flex items-baseline gap-3"
          style={{
            clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          }}
        >
          <span
            className="text-[48px] leading-none"
            style={{ fontFamily: "'Long Cang', cursive" }}
          >
            郭世越
          </span>
          <span
            className="text-[32px]"
            style={{ fontFamily: "'Rock Salt', cursive", lineHeight: "1.6" }}
            suppressHydrationWarning
          >
            Ellis Guo
          </span>
        </div>
      </div>
    </div>
  );
}
