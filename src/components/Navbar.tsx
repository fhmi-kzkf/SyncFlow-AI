import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full max-w-[1200px] mx-auto px-6 py-8 flex justify-between items-center z-50 relative">
      <Link href="/" className="flex items-center gap-3 font-times-new-roman text-[32px] font-normal leading-none text-bone-white hover:opacity-80 transition-opacity active:scale-[0.98] duration-200">
        <svg className="w-8 h-8 text-radish-bloom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="9" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
          <circle cx="15" cy="12" r="5" stroke="currentColor" />
        </svg>
        SyncFlow AI
      </Link>
      
      <div className="flex items-center gap-2">
        <Link href="/features" className="bg-bone-white text-obsidian rounded-[40px] px-[20px] py-[8px] text-[14px] font-suisse-intl-webm hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
          Features
        </Link>
        <Link href="/how-it-works" className="bg-bone-white text-obsidian rounded-[40px] px-[20px] py-[8px] text-[14px] font-suisse-intl-webm hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
          How it Works
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/generate" className="bg-bone-white text-obsidian rounded-[40px] px-[20px] py-[8px] text-[14px] font-suisse-intl-webm hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
          Start Generating
        </Link>
      </div>
    </nav>
  );
}
