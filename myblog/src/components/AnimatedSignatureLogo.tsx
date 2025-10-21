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
        <img
          src="/signatures/signature_2.svg"
          alt="郭世越 Ellis Guo"
          width={250}
          height={62}
          className="block"
        />
      </div>
    </div>
  );
}
