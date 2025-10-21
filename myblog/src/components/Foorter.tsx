import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t-[2px] border-t-black py-3">
      <div className="max-w-[1024px] mx-auto px-5 text-center">
        <div className="space-y-2">
          <p className="text-base text-[#3e2b2b]">郭世越 Ellis Guo</p>
          <p className="text-sm text-[#999]">
            Email:{" "}
            <a
              href="mailto:hi@ellisguo.com"
              className="hover:text-[#f35029] transition-colors"
            >
              hi@ellisguo.com
            </a>
          </p>
          <p className="text-xs text-[#999] pt-4">
            © 2025 Ellis Guo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
