"use client";

import { useState, useEffect } from "react";
import AnimatedSignatureLogo from "./AnimatedSignatureLogo";
import Link from "next/link";

interface SidebarNavProps {
  isAdmin?: boolean;
  locale?: string;
}

export default function SidebarNav({
  isAdmin = false,
  locale = "en",
}: SidebarNavProps) {
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
    {
      id: "about",
      label: locale === "zh" ? "关于" : locale === "fr" ? "À propos" : "About",
    },
    {
      id: "experience",
      label:
        locale === "zh"
          ? "履历"
          : locale === "fr"
          ? "Expériences"
          : "Experiences",
    },
    {
      id: "projects",
      label:
        locale === "zh" ? "项目" : locale === "fr" ? "Projets" : "Projects",
    },
    {
      id: "posts",
      label: locale === "zh" ? "随笔" : locale === "fr" ? "Articles" : "Posts",
    },
  ];

  return (
    <aside className="w-full lg:w-[46%] lg:h-screen lg:sticky lg:top-0 flex flex-col lg:justify-between py-30 lg:py-24 px-6 lg:px-12">
      {/* Top section: Name + Intro + Navigation */}
      <div>
        {/* Logo/Signature */}
        <div className="mb-8 flex justify-center lg:justify-start pb-12 lg:pb-0">
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

      {/* Bottom section: Edit Homepage button */}
      <div className="hidden lg:block">
        {isAdmin && (
          <Link
            href={`/${locale}/admin/homepage/edit`}
            className="inline-block px-4 py-2 border-2 border-black bg-white hover:bg-[#F35029] hover:!text-white hover:border-[#F35029] transition-all font-semibold text-sm hover:no-underline"
          >
            {locale === "zh"
              ? "编辑主页"
              : locale === "fr"
              ? "Modifier la page"
              : "Edit Homepage"}
          </Link>
        )}
      </div>
    </aside>
  );
}
