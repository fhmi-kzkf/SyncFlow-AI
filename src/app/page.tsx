"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Hero Parallax & Text Animation
    const heroContext = gsap.context(() => {
      // Intro fade in and scale up
      gsap.fromTo(
        ".hero-letter",
        { y: 150, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: "expo.out",
        }
      );

      gsap.fromTo(
        ".floating-shape",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out", delay: 0.5 }
      );

      // Parallax on scroll
      gsap.to(".hero-text-container", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
      gsap.to(".floating-shape", {
        yPercent: -50,
        rotation: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    // Stacked Cards Animation
    const cardsContext = gsap.context(() => {
      if (panelsRef.current.length === 0) return;

      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          endTrigger: cardsRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          markers: false,
          id: `panel-${i}`,
        });
      });
    }, cardsRef);

    return () => {
      heroContext.revert();
      cardsContext.revert();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-obsidian overflow-hidden">
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="w-full h-[100vh] flex flex-col justify-center items-center relative overflow-hidden -mt-[100px] pt-[100px]"
      >
        {/* Background Floating Organic Shapes (Simulated with CSS Gradients) */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-[40%_60%_70%_30%] bg-gradient-to-br from-[#1a4a28] to-[#0a2a12] blur-[40px] opacity-60 floating-shape mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-[60%_40%_30%_70%] bg-gradient-to-tl from-[#1a4a28] to-[#0a2a12] blur-[50px] opacity-60 floating-shape mix-blend-screen" />
        <div className="absolute top-[40%] right-[15%] w-[250px] h-[250px] rounded-[50%_50%_60%_40%] bg-gradient-to-bl from-[#1a4a28] to-[#0a2a12] blur-[30px] opacity-70 floating-shape mix-blend-screen" />

        {/* Massive Typography */}
        <div className="hero-text-container relative z-10 flex flex-col items-center justify-center w-full select-none pointer-events-none mt-[-5vh]">
          <h1 className="font-times-new-roman text-bone-white m-0 p-0 leading-[0.8] tracking-[-0.08em] text-center" style={{ fontSize: 'min(25vw, 300px)' }}>
            <span className="hero-letter inline-block">S</span>
            <span className="hero-letter inline-block">y</span>
            <span className="hero-letter inline-block">n</span>
            <span className="hero-letter inline-block mr-8">c</span>
          </h1>
          <h1 className="font-times-new-roman text-bone-white m-0 p-0 leading-[0.8] tracking-[-0.08em] text-center mt-[-3vw] ml-[10vw]" style={{ fontSize: 'min(25vw, 300px)' }}>
            <span className="hero-letter inline-block">F</span>
            <span className="hero-letter inline-block">l</span>
            <span className="hero-letter inline-block">o</span>
            <span className="hero-letter inline-block">w</span>
          </h1>
        </div>

        {/* Animated Background Mesh/Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)' }}></div>
        <div className="absolute top-[40%] left-[20%] w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-bone-white to-transparent opacity-30 animate-pulse z-0" />
        <div className="absolute top-[60%] right-[20%] w-[30vw] h-[1px] bg-gradient-to-r from-transparent via-radish-bloom to-transparent opacity-40 animate-pulse z-0 delay-500" />


        <div className="absolute bottom-10 left-10 z-30">
          <p className="editorial-body text-[18px] max-w-[400px] opacity-80 font-light mix-blend-difference">
            Agentic SDLC Orchestrator.<br/>
            From ideation to execution in seconds.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full max-w-[1400px] px-8 py-40 flex flex-col md:flex-row gap-24 relative z-20 bg-obsidian">
        <div className="md:w-1/3">
          <h2 className="font-times-new-roman text-[50px] md:text-[80px] leading-[0.9] tracking-[-0.02em] text-bone-white">The Cold<br/>Start.</h2>
        </div>
        <div className="md:w-2/3 flex flex-col gap-16 mt-4">
          <p className="font-suisse-intl-webm text-[24px] md:text-[32px] leading-[1.3] tracking-[-0.01em] text-bone-white font-light">
            Context switching fatigue kills momentum. Developers jump between AI chats, 
            code editors, and documentation tools — losing focus and creating 
            fragmented specifications.
          </p>
          <hr className="border-t border-graphite w-full" />
          <p className="font-suisse-intl-webm text-[24px] md:text-[32px] leading-[1.3] tracking-[-0.01em] text-bone-white font-light">
            Good ideas die before execution because drafting the initial requirements takes too long. 
            SyncFlow eliminates doc-code divergence through perfect orchestration.
          </p>
        </div>
      </section>

      {/* Stacked Cards Section - How it Works */}
      <section 
        id="how-it-works"
        ref={cardsRef}
        className="w-full flex flex-col relative pb-[20vh] bg-obsidian"
      >
        {/* Card 1: Elicitation */}
        <div 
          ref={(el) => { panelsRef.current[0] = el; }}
          className="w-full h-screen flex items-center justify-center bg-obsidian border-t border-graphite sticky top-0"
        >
          <div className="max-w-[1400px] w-full px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative z-10">
              <span className="font-editorial-new text-[18px] uppercase tracking-widest mb-6 block text-smoke">Step 01</span>
              <h3 className="font-times-new-roman text-[80px] md:text-[120px] leading-[0.85] tracking-[-0.03em] mb-8 text-bone-white">Elicitation.</h3>
              <p className="font-suisse-intl-webm text-[20px] md:text-[24px] leading-[1.4] text-bone-white font-light max-w-[500px]">
                Fill out a simple brief. Qwen 3.7 Plus reads your intent and asks 
                surgical follow-up questions only when necessary.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end relative h-[500px] w-full">
               <div className="absolute right-[10%] top-[10%] w-[350px] h-[450px] bg-graphite/30 rounded-full blur-[60px]" />
               
               {/* Decorative Terminal/Code Box to fill space */}
               <div className="absolute top-[20%] right-[15%] w-[320px] h-[200px] border border-smoke/30 bg-obsidian/80 backdrop-blur-sm flex flex-col z-20 overflow-hidden shadow-2xl">
                 <div className="w-full h-[30px] border-b border-smoke/30 flex items-center px-4 gap-2">
                   <div className="w-2 h-2 rounded-full bg-smoke/50" />
                   <div className="w-2 h-2 rounded-full bg-smoke/50" />
                   <div className="w-2 h-2 rounded-full bg-smoke/50" />
                   <span className="font-editorial-new text-[12px] text-smoke ml-4">qwen-agent.log</span>
                 </div>
                 <div className="p-4 font-mono text-[12px] text-smoke flex flex-col gap-2">
                   <span className="text-radish-bloom">&gt; Initializing context...</span>
                   <span>&gt; Analyzing user brief...</span>
                   <span>&gt; Generating clarifying questions...</span>
                   <span className="animate-pulse">_</span>
                 </div>
               </div>

               {/* Decorative Barcode */}
               <div className="absolute bottom-[20%] left-[10%] w-[120px] h-[60px] flex flex-col justify-between z-20 opacity-50">
                 <div className="w-full h-full flex gap-1 items-end">
                   <div className="w-[4px] h-[40px] bg-bone-white"></div>
                   <div className="w-[2px] h-[50px] bg-bone-white"></div>
                   <div className="w-[8px] h-[60px] bg-bone-white"></div>
                   <div className="w-[3px] h-[30px] bg-bone-white"></div>
                   <div className="w-[6px] h-[50px] bg-bone-white"></div>
                   <div className="w-[2px] h-[60px] bg-bone-white"></div>
                   <div className="w-[10px] h-[40px] bg-bone-white"></div>
                   <div className="w-[4px] h-[60px] bg-bone-white"></div>
                 </div>
                 <span className="font-editorial-new text-[10px] text-bone-white mt-1">SYS.SYNC.01</span>
               </div>

               <span className="font-times-new-roman text-[300px] text-graphite/40 leading-none absolute right-[5%] bottom-[-10%] select-none z-10">1</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orchestration */}
        <div 
          ref={(el) => { panelsRef.current[1] = el; }}
          className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] border-t border-graphite sticky top-0"
        >
          <div className="max-w-[1400px] w-full px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative z-10">
              <span className="font-editorial-new text-[18px] uppercase tracking-widest mb-6 block text-smoke">Step 02</span>
              <h3 className="font-times-new-roman text-[80px] md:text-[120px] leading-[0.85] tracking-[-0.03em] mb-8 text-bone-white">Orchestrate.</h3>
              <p className="font-suisse-intl-webm text-[20px] md:text-[24px] leading-[1.4] text-bone-white font-light max-w-[500px]">
                The sequential pipeline begins. PRD feeds into TRD, which feeds into 
                the Database Schema, culminating in the App Flow. True prompt chaining.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end relative h-[500px] w-full">
               <div className="absolute right-[10%] top-[10%] w-[350px] h-[450px] bg-[#1a1a1a] rounded-full blur-[60px]" />
               
               {/* Decorative PRD/TRD Stack */}
               <div className="absolute top-[30%] right-[20%] w-[280px] h-[180px] border border-smoke/30 bg-[#111] z-30 shadow-2xl transform rotate-[-5deg] p-4 flex flex-col justify-center gap-3">
                 <div className="w-[60%] h-[2px] bg-bone-white/60"></div>
                 <div className="w-[80%] h-[2px] bg-bone-white/40"></div>
                 <div className="w-[70%] h-[2px] bg-bone-white/20"></div>
                 <span className="font-suisse-intl-webm text-[10px] text-smoke mt-4 uppercase">TRD.md</span>
               </div>
               <div className="absolute top-[35%] right-[15%] w-[280px] h-[180px] border border-radish-bloom/50 bg-[#151515] z-20 shadow-2xl transform rotate-[5deg] p-4 flex flex-col justify-center gap-3">
                 <div className="w-[50%] h-[2px] bg-radish-bloom/80"></div>
                 <div className="w-[90%] h-[2px] bg-radish-bloom/50"></div>
                 <div className="w-[40%] h-[2px] bg-radish-bloom/30"></div>
                 <span className="font-suisse-intl-webm text-[10px] text-radish-bloom mt-4 uppercase">PRD.md</span>
               </div>

               <span className="font-times-new-roman text-[300px] text-graphite/40 leading-none absolute right-[5%] bottom-[-10%] select-none z-10">2</span>
            </div>
          </div>
        </div>

        {/* Card 3: Execution */}
        <div 
          ref={(el) => { panelsRef.current[2] = el; }}
          className="w-full h-screen flex items-center justify-center bg-radish-bloom sticky top-0 overflow-hidden"
        >
          {/* Decorative barcode-like lines */}
          <div className="absolute top-0 right-[15%] w-[1px] h-full bg-black/10"></div>
          <div className="absolute top-0 right-[16%] w-[3px] h-full bg-black/10"></div>
          <div className="absolute top-0 right-[17%] w-[1px] h-full bg-black/10"></div>
          <div className="absolute top-0 right-[19%] w-[5px] h-full bg-black/10"></div>

          <div className="max-w-[1400px] w-full px-8 flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="md:w-1/2">
              <span className="font-editorial-new text-[18px] uppercase tracking-widest mb-6 block text-obsidian font-medium">Step 03</span>
              <h3 className="font-times-new-roman text-[80px] md:text-[120px] leading-[0.85] tracking-[-0.03em] mb-8 text-obsidian">Execution.</h3>
              <p className="font-suisse-intl-webm text-[20px] md:text-[24px] leading-[1.4] text-obsidian font-light max-w-[500px] mb-12">
                Review your documents in the live dashboard. Export them as clean 
                Markdown and Prisma files. Ready for the codebase.
              </p>
              <Link href="/generate" className="inline-block border border-obsidian rounded-[40px] text-obsidian bg-transparent px-[40px] py-[18px] text-[16px] uppercase tracking-widest hover:bg-obsidian hover:text-radish-bloom hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
                Start Generating
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end relative h-[500px] w-full">
               <span className="font-times-new-roman text-[300px] text-black/10 leading-none absolute right-[5%] bottom-[-10%] select-none">3</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
