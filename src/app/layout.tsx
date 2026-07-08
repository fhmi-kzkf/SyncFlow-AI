import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// We use Inter as the substitute for Suisse Intl WebM as specified in DESIGN.md
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SyncFlow AI — The Agentic SDLC Orchestrator",
  description: "Transform a single product idea into consistent PRD, TRD, Schema, and App Flow documents using Qwen 3.7 Plus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>

        {/* Animated Marquee Footer */}
        <footer className="w-full bg-bone-white text-obsidian pt-16 pb-8 overflow-hidden flex flex-col relative z-20">
          <div className="w-full border-b border-obsidian/20 pb-16 flex overflow-hidden">
            <div className="w-fit flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
              <div className="flex whitespace-nowrap">
                <span className="font-suisse-intl-webm text-[150px] md:text-[250px] font-bold leading-none tracking-tighter text-radish-bloom pr-16">SYNCFLOW AI</span>
                <span className="font-suisse-intl-webm text-[150px] md:text-[250px] font-bold leading-none tracking-tighter text-radish-bloom pr-16">SYNCFLOW AI</span>
                <span className="font-suisse-intl-webm text-[150px] md:text-[250px] font-bold leading-none tracking-tighter text-radish-bloom pr-16">SYNCFLOW AI</span>
                <span className="font-suisse-intl-webm text-[150px] md:text-[250px] font-bold leading-none tracking-tighter text-radish-bloom pr-16">SYNCFLOW AI</span>
              </div>
              <div className="flex whitespace-nowrap">
                <span className="font-suisse-intl-webm text-[150px] md:text-[250px] font-bold leading-none tracking-tighter text-radish-bloom pr-16">SYNCFLOW AI</span>
                <span className="font-suisse-intl-webm text-[150px] md:text-[250px] font-bold leading-none tracking-tighter text-radish-bloom pr-16">SYNCFLOW AI</span>
                <span className="font-suisse-intl-webm text-[150px] md:text-[250px] font-bold leading-none tracking-tighter text-radish-bloom pr-16">SYNCFLOW AI</span>
                <span className="font-suisse-intl-webm text-[150px] md:text-[250px] font-bold leading-none tracking-tighter text-radish-bloom pr-16">SYNCFLOW AI</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1400px] mx-auto px-8 pt-12 flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex flex-col max-w-[300px]">
              <span className="font-suisse-intl-webm text-[14px] font-medium mb-2 tracking-tight">Innovate. Customize. Collaborate.</span>
              <a href="/generate" className="font-suisse-intl-webm text-[32px] font-bold leading-none hover:text-radish-bloom transition-colors flex items-center gap-2">
                Find out more <span className="font-times-new-roman font-normal">↗</span>
              </a>
            </div>

            <div className="flex gap-16 md:gap-32 text-[14px] font-suisse-intl-webm">
              <div className="flex flex-col gap-4">
                <span className="text-obsidian/50 font-editorial-new uppercase tracking-widest text-[12px] mb-2">Socials</span>
                <a href="https://github.com/fhmi-kzkf/SyncFlow-AI" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-radish-bloom transition-colors">GitHub</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-obsidian/50 font-editorial-new uppercase tracking-widest text-[12px] mb-2">//</span>
                <a href="/features" className="font-medium hover:text-radish-bloom transition-colors">Features</a>
                <a href="/how-it-works" className="font-medium hover:text-radish-bloom transition-colors">How it Works</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
