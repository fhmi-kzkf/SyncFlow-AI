"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations with blur reveal
      gsap.fromTo(
        ".title-anim",
        { x: -50, opacity: 0, filter: "blur(10px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.2, ease: "power3.out" }
      );

      // Animate the vertical timeline line drawing down
      gsap.fromTo(
        ".timeline-line",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // Animate the timeline glow dot running down the path
      gsap.fromTo(
        ".timeline-glow",
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // Fade in steps individually as they scroll into view
      gsap.utils.toArray(".timeline-step").forEach((step: any, i) => {
        const textElements = step.querySelectorAll(".step-text");
        
        gsap.fromTo(
          step,
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: step,
              start: "top 60%",
            }
          }
        );

        gsap.fromTo(
          textElements,
          { y: 40, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
            }
          }
        );

        // Pop the dots
        gsap.fromTo(
          step.querySelector(".timeline-dot"),
          { scale: 0, backgroundColor: "#000" },
          {
            scale: 1.3,
            backgroundColor: i === 0 ? "#eb516d" : "#fff",
            duration: 0.6,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-obsidian pt-[150px] pb-32 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-radish-bloom/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        
        <div className="mb-24">
          <span className="font-editorial-new text-[18px] uppercase tracking-widest text-smoke mb-6 block title-anim">The Pipeline</span>
          <h1 className="font-times-new-roman text-[80px] md:text-[140px] leading-[0.85] tracking-[-0.03em] text-bone-white title-anim">How it works.</h1>
        </div>

        <div className="timeline-container flex flex-col gap-0 ml-[20px] md:ml-[50px] pl-[40px] md:pl-[80px] relative pb-12">
          
          {/* Vertical Base Line */}
          <div className="absolute top-0 left-0 w-[1px] h-full bg-smoke/20"></div>
          {/* Animated Highlight Line */}
          <div className="timeline-line absolute top-0 left-0 w-[1px] h-0 bg-radish-bloom z-10 shadow-[0_0_15px_#eb516d]"></div>
          {/* Running Glow Orb */}
          <div className="timeline-glow absolute left-[-5px] w-[11px] h-[11px] bg-radish-bloom rounded-full z-20 shadow-[0_0_20px_#eb516d] pointer-events-none" />
          
          {/* Step 1 */}
          <div className="timeline-step relative pb-32">
            <div className="timeline-dot absolute left-[-50px] md:left-[-90px] top-0 w-[20px] h-[20px] bg-obsidian border-2 border-radish-bloom rounded-full transform -translate-x-1/2 z-30 transition-all duration-300" />
            <span className="step-text font-editorial-new text-[14px] uppercase tracking-widest text-radish-bloom mb-4 block">Phase I</span>
            <h2 className="step-text font-times-new-roman text-[50px] text-bone-white leading-none mb-6">The Elicitation Phase</h2>
            <p className="step-text font-suisse-intl-webm text-[20px] text-smoke font-light leading-relaxed max-w-[700px]">
              You start by defining the core concept of your application. What does it do? Who is it for? 
              Qwen 3.7 Plus analyzes this brief and determines if there is enough information to build a technical spec. 
              If not, it will enter a conversational loop, asking you precise questions to extract the missing context.
            </p>
          </div>

          {/* Step 2 */}
          <div className="timeline-step relative pb-32">
            <div className="timeline-dot absolute left-[-50px] md:left-[-90px] top-0 w-[20px] h-[20px] bg-obsidian border-2 border-bone-white rounded-full transform -translate-x-1/2 z-30 transition-all duration-300" />
            <span className="step-text font-editorial-new text-[14px] uppercase tracking-widest text-smoke mb-4 block">Phase II</span>
            <h2 className="step-text font-times-new-roman text-[50px] text-bone-white leading-none mb-6">Prompt Chaining</h2>
            <p className="step-text font-suisse-intl-webm text-[20px] text-smoke font-light leading-relaxed max-w-[700px]">
              Once the context is clear, the orchestrator takes over. It fires a sequence of prompts to Qwen 3.7 Plus:
              <br/><br/>
              1. <strong className="text-bone-white">PRD Gen</strong>: Creates the Product Requirements Document.<br/>
              2. <strong className="text-bone-white">TRD Gen</strong>: Reads the PRD, creates the Technical Requirements Document.<br/>
              3. <strong className="text-bone-white">Schema Gen</strong>: Reads PRD + TRD, writes the Prisma Database Schema.<br/>
              4. <strong className="text-bone-white">Flow Gen</strong>: Maps the user journeys and screen inventory.
            </p>
          </div>

          {/* Step 3 */}
          <div className="timeline-step relative pb-10">
            <div className="timeline-dot absolute left-[-50px] md:left-[-90px] top-0 w-[20px] h-[20px] bg-obsidian border-2 border-bone-white rounded-full transform -translate-x-1/2 z-30 transition-all duration-300" />
            <span className="step-text font-editorial-new text-[14px] uppercase tracking-widest text-smoke mb-4 block">Phase III</span>
            <h2 className="step-text font-times-new-roman text-[50px] text-bone-white leading-none mb-6">Execution & Export</h2>
            <p className="step-text font-suisse-intl-webm text-[20px] text-smoke font-light leading-relaxed max-w-[700px]">
              The results are instantly compiled into a live dashboard. You can review the markdown and code directly in the browser, 
              or download the entire suite as a `.zip` archive to drop straight into your GitHub repository.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
