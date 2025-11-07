export default function Footer() {
  return (
    <footer className="mt-4 border-t border-[#ccc] py-8">
      <div className="max-w-[1024px] mx-auto px-5 text-center">
        <p className="text-base text-[#000] mb-2">郭世越 Ellis Guo</p>
        <p className="text-sm text-[#555] mb-6">
          <a
            href="mailto:hi@ellisguo.com"
            className="hover:text-[#f35029] transition-colors"
          >
            hi@ellisguo.com
          </a>
        </p>
        <p className="text-xs text-[#999]">
          © 2025 Ellis Guo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
