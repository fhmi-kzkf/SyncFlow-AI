"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations with 3D flip
      gsap.fromTo(
        ".title-anim",
        { y: 80, opacity: 0, rotationX: -30, transformPerspective: 1000 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.5, stagger: 0.2, ease: "expo.out" }
      );

      // Stagger fade-in for bento cells with 3D rotation and scale
      gsap.fromTo(
        ".bento-cell",
        { y: 100, opacity: 0, scale: 0.9, rotationY: 15, transformPerspective: 1000 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 85%",
          },
        }
      );

      // Floating background glows
      gsap.to(".bg-glow-1", {
        y: -40,
        x: 20,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
      gsap.to(".bg-glow-2", {
        y: 40,
        x: -20,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-obsidian pt-[150px] pb-32 overflow-hidden">
      
      {/* Background Glows */}
      <div className="bg-glow-1 absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-radish-bloom/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="bg-glow-2 absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#1a4a28]/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 relative">
        
        {/* Header Section */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-editorial-new text-[18px] uppercase tracking-widest text-smoke mb-4 block title-anim">Capabilities</span>
            <h1 className="font-times-new-roman text-[80px] md:text-[120px] leading-[0.85] tracking-[-0.03em] text-bone-white title-anim">Features.</h1>
          </div>
          <p className="font-suisse-intl-webm text-[18px] text-smoke max-w-[400px] font-light leading-relaxed mb-4 title-anim">
            SyncFlow couples cutting-edge agentic workflows with technical rigor, delivering specifications that drive code.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Dynamic Elicitation */}
          <div className="bento-cell col-span-1 md:col-span-2 border border-smoke/30 bg-[#0a0a0a] p-10 flex flex-col justify-between relative overflow-hidden group min-h-[450px]">
            <div className="absolute right-0 top-0 w-[40%] h-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-l from-radish-bloom/10 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start z-10">
              <span className="font-times-new-roman text-[60px] text-radish-bloom/50 font-normal">01</span>
              {/* Dynamic Chat Visualizer */}
              <div className="w-[180px] border border-smoke/20 bg-obsidian p-4 font-mono text-[10px] text-smoke flex flex-col gap-2 shadow-xl transform rotate-[2deg] group-hover:rotate-0 transition-transform duration-300">
                <span className="text-radish-bloom font-bold">PM Agent</span>
                <p className="leading-normal">How should the billing system handle currency conversion latency?</p>
                <div className="w-full h-[1px] bg-smoke/20" />
                <span className="text-bone-white/60">User Input...</span>
              </div>
            </div>

            <div className="z-10 mt-12">
              <h2 className="font-times-new-roman text-[36px] text-bone-white mb-4">Dynamic Elicitation</h2>
              <p className="font-suisse-intl-webm text-[16px] text-smoke font-light leading-relaxed max-w-[500px]">
                Qwen 3.7 Plus acts as a principal product manager. Instead of forcing you to fill out endless forms, it reads your basic intent and only asks questions when it detects critical ambiguities in your architecture or business logic.
              </p>
            </div>
          </div>

          {/* Card 2: Technical Barcode Panel */}
          <div className="bento-cell col-span-1 border border-smoke/30 bg-graphite/20 p-10 flex flex-col justify-between min-h-[450px]">
            <span className="font-times-new-roman text-[60px] text-smoke/30 font-normal">✦</span>
            
            {/* Visual Grid Lines and Barcode */}
            <div className="w-full flex flex-col gap-4 opacity-40">
              <div className="w-full h-[2px] bg-bone-white"></div>
              <div className="w-[80%] h-[1px] bg-bone-white"></div>
              <div className="w-[90%] h-[1px] bg-bone-white"></div>
              <div className="w-full h-8 flex gap-1 items-end mt-4">
                <div className="w-[6px] h-full bg-bone-white"></div>
                <div className="w-[2px] h-[70%] bg-bone-white"></div>
                <div className="w-[8px] h-full bg-bone-white"></div>
                <div className="w-[4px] h-[50%] bg-bone-white"></div>
                <div className="w-[10px] h-full bg-bone-white"></div>
              </div>
            </div>

            <div>
              <h2 className="font-times-new-roman text-[32px] text-bone-white mb-4">Blueprint System</h2>
              <p className="font-suisse-intl-webm text-[16px] text-smoke font-light leading-relaxed">
                A rigid mathematical architecture ensuring documents correspond directly to functional programming assets.
              </p>
            </div>
          </div>

          {/* Card 3: Production-Ready Code */}
          <div className="bento-cell col-span-1 border border-smoke/30 bg-[#0a0a0a] p-10 flex flex-col justify-between min-h-[450px] relative overflow-hidden group">
            <span className="font-times-new-roman text-[60px] text-smoke/30 font-normal">02</span>
            
            {/* Database Prisma Code Snippet Representation */}
            <div className="w-full border border-smoke/20 bg-obsidian p-4 font-mono text-[10px] text-smoke shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300">
              <span className="text-[#98c379]">model</span> <span className="text-[#61afef]">User</span> {"{"}
              <div className="pl-4">
                id <span className="text-[#abb2bf]">String</span> <span className="text-[#c678dd]">@id</span>
                <br/>email <span className="text-[#abb2bf]">String</span> <span className="text-[#c678dd]">@unique</span>
                <br/>sessions <span className="text-[#abb2bf]">Session[]</span>
              </div>
              {"}"}
            </div>

            <div>
              <h2 className="font-times-new-roman text-[32px] text-bone-white mb-4">Prisma Schemas</h2>
              <p className="font-suisse-intl-webm text-[16px] text-smoke font-light leading-relaxed">
                We don't just give you markdown. SyncFlow generates actual, clean Database Schemas that you can push directly to database engines.
              </p>
            </div>
          </div>

          {/* Card 4: Sequential Orchestration */}
          <div className="bento-cell col-span-1 md:col-span-2 border border-smoke/30 bg-[#0a0a0a] p-10 flex flex-col justify-between relative overflow-hidden group min-h-[450px]">
            <div className="absolute left-0 bottom-0 w-full h-[30%] bg-gradient-to-t from-radish-bloom/5 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <span className="font-times-new-roman text-[60px] text-radish-bloom/50 font-normal">03</span>
              {/* Linked Node Pipeline Visualization */}
              <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="border border-smoke/40 rounded-full px-3 py-1 font-mono text-[9px] bg-obsidian">PRD</div>
                <div className="w-8 h-[1px] bg-radish-bloom"></div>
                <div className="border border-radish-bloom rounded-full px-3 py-1 font-mono text-[9px] bg-obsidian text-radish-bloom">TRD</div>
                <div className="w-8 h-[1px] bg-smoke/40"></div>
                <div className="border border-smoke/40 rounded-full px-3 py-1 font-mono text-[9px] bg-obsidian">SCHEMA</div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-times-new-roman text-[36px] text-bone-white mb-4">Sequential Prompt Chaining</h2>
              <p className="font-suisse-intl-webm text-[16px] text-smoke font-light leading-relaxed max-w-[500px]">
                Documents are not generated in isolation. The TRD consumes the PRD. The Schema consumes the TRD. This creates a perfect, unbroken chain of context that eliminates divergence between product and engineering specs.
              </p>
            </div>
          </div>

          {/* Card 5: Screen Inventories */}
          <div className="bento-cell col-span-1 md:col-span-2 border border-smoke/30 bg-[#0a0a0a] p-10 flex flex-col justify-between min-h-[450px] relative overflow-hidden group">
            <span className="font-times-new-roman text-[60px] text-smoke/30 font-normal">04</span>
            
            {/* Visual App Flow Card stack */}
            <div className="absolute right-10 top-10 flex gap-2">
              <div className="w-[100px] h-[140px] border border-smoke/30 bg-graphite/40 transform -rotate-[5deg] group-hover:rotate-0 transition-all shadow-xl"></div>
              <div className="w-[100px] h-[140px] border border-radish-bloom/50 bg-[#111] transform rotate-[5deg] group-hover:rotate-0 transition-all shadow-xl p-3 flex flex-col justify-between">
                <div className="w-[30%] h-2 bg-radish-bloom/80 rounded"></div>
                <div className="w-full h-8 border border-radish-bloom/20 rounded"></div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-times-new-roman text-[36px] text-bone-white mb-4">App Flow Map</h2>
              <p className="font-suisse-intl-webm text-[16px] text-smoke font-light leading-relaxed max-w-[500px]">
                The App Flow generator breaks down your product into exact screens, states, and components, allowing your design team to immediately start working on Figma without waiting for the engineers.
              </p>
            </div>
          </div>

          {/* Card 6: Call to Action */}
          <div className="bento-cell col-span-1 bg-radish-bloom text-obsidian p-10 flex flex-col justify-between min-h-[450px] hover:bg-bone-white transition-colors duration-500">
            <span className="font-times-new-roman text-[60px] text-obsidian/30 font-normal">✦</span>
            <div>
              <h2 className="font-times-new-roman text-[40px] leading-[1.05] mb-6 font-bold">Ready to design?</h2>
              <Link href="/generate" className="inline-block border border-obsidian rounded-[40px] px-8 py-3 font-suisse-intl-webm text-[14px] uppercase tracking-widest hover:bg-obsidian hover:text-bone-white transition-all duration-300 active:scale-[0.96]">
                Begin Generation
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
