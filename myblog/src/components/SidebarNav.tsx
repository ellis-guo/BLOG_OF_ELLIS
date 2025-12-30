"use client";

import { useState, useEffect } from "react";
import AnimatedSignatureLogo from "./AnimatedSignatureLogo";

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState("about");

  // Monitor scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "posts"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Highlight section when it enters the upper third of viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "posts", label: "Writing" },
  ];

  return (
    <aside className="w-full lg:w-[48%] lg:h-screen lg:sticky lg:top-0 flex flex-col lg:justify-between py-12 lg:py-24 px-6 lg:px-12">
      {/* Top section: Name + Intro + Navigation */}
      <div>
        {/* Logo/Signature */}
        <div className="mb-8">
          <AnimatedSignatureLogo />
        </div>

        {/* Job Title */}
        <h2 className="text-xl font-semibold text-black mb-2">
          Full-stack Developer
        </h2>

        {/* School/Location */}
        <p className="text-sm text-gray-600 mb-4">
          Computer Science Student @ Northeastern
        </p>

        {/* Slogan */}
        <p className="text-sm text-gray-500 leading-relaxed mb-16">
          Building modern web applications with Next.js and TypeScript
        </p>

        {/* Navigation links - Hidden on mobile */}
        <nav className="hidden lg:block">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 group w-full text-left"
                >
                  {/* Indicator line */}
                  <span
                    className={`h-px transition-all duration-200 ease-out
                      ${
                        activeSection === item.id
                          ? "w-16 bg-[#F35029]"
                          : "w-8 bg-gray-300 group-hover:w-12 group-hover:bg-black"
                      }`}
                  />
                  {/* Label */}
                  <span
                    className={`text-sm font-medium transition-colors duration-200
                      ${
                        activeSection === item.id
                          ? "text-[#F35029]"
                          : "text-gray-400 group-hover:text-black"
                      }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom section: Social links - Hidden on mobile */}
      <div className="text-sm text-gray-400 hidden lg:block">
        {/* Placeholder for social links */}
      </div>
    </aside>
  );
}
