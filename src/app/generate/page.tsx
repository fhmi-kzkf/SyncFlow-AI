"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function GeneratePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [features, setFeatures] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    idea: "",
    targetUser: "",
    stack: "",
    scale: "small",
  });

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, ""]);
  
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);

    // Simulate step logs while calling API
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < 2 ? prev + 1 : prev));
    }, 2000);
    
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          features: features.filter(f => f.trim() !== "")
        }),
      });
      
      const data = await response.json();
      if (data.sessionId) {
        // Redirect to chat follow-up page
        router.push(`/session/${data.sessionId}`);
      }
    } catch (error) {
      console.error("Failed to create session", error);
      setLoading(false);
      clearInterval(interval);
    }
  };

  useEffect(() => {
    // Intro stagger for form fields
    gsap.fromTo(
      ".form-element",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
    );
  }, []);

  const loadingStepsText = [
    "Connecting to Fireworks AI...",
    "Spawning Qwen-3.7-Plus Agent...",
    "Analyzing architecture & business logic..."
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-obsidian z-50 flex flex-col items-center justify-center">
        <div className="w-full max-w-[500px] px-8 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-12">
            {/* Pulsing visual core */}
            <div className="absolute inset-0 bg-radish-bloom rounded-full opacity-20 animate-ping"></div>
            <div className="absolute inset-2 border-2 border-radish-bloom rounded-full animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute inset-4 bg-obsidian border border-smoke/30 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-radish-bloom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="9" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
                <circle cx="15" cy="12" r="5" stroke="currentColor" />
              </svg>
            </div>
          </div>
          <span className="font-times-new-roman text-[32px] text-bone-white text-center mb-6">Initializing Pipeline</span>
          <div className="w-full bg-graphite/40 border border-smoke/20 p-6 rounded-none font-mono text-[13px] text-smoke flex flex-col gap-2 shadow-2xl">
            <span className="text-radish-bloom font-bold">&gt; SYNCFLOW ORCHESTRATOR ACTIVE</span>
            {loadingStepsText.map((step, idx) => {
              if (idx < loadingStep) {
                return <span key={idx} className="text-bone-white/80">&gt; {step} [DONE]</span>;
              }
              if (idx === loadingStep) {
                return <span key={idx} className="text-radish-bloom animate-pulse">&gt; {step}...</span>;
              }
              return <span key={idx} className="opacity-30">&gt; {step}</span>;
            })}
          </div>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full bg-transparent border border-smoke rounded-none px-[20px] py-[15px] text-bone-white font-suisse-intl-webm focus:outline-none focus:border-bone-white transition-colors placeholder-smoke opacity-80";
  const labelClasses = "block mb-4 font-times-new-roman text-[24px] text-bone-white";

  return (
    <div className="w-full flex flex-col items-center pt-[100px] pb-[150px] min-h-[90vh]">
      <div className="w-full max-w-[800px] px-6">
        <div className="mb-16 form-element">
          <span className="thin-label uppercase tracking-widest block mb-4">Elicitation Phase</span>
          <h1 className="display-headline text-[70px]">Define the vision.</h1>
          <hr className="hairline-divider mt-8" />
        </div>
 
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          
          {/* Idea */}
          <div className="form-element">
            <label className={labelClasses}>What are you building?</label>
            <textarea 
              required
              rows={4}
              placeholder="e.g. A CRM for real estate agents that integrates with WhatsApp..."
              className={`${inputClasses} resize-none`}
              value={formData.idea}
              onChange={(e) => setFormData({...formData, idea: e.target.value})}
            />
          </div>
 
          {/* Target User */}
          <div className="form-element">
            <label className={labelClasses}>Who is the target user?</label>
            <input 
              required
              type="text"
              placeholder="e.g. Solo real estate agents in Southeast Asia"
              className={inputClasses}
              value={formData.targetUser}
              onChange={(e) => setFormData({...formData, targetUser: e.target.value})}
            />
          </div>
 
          {/* Core Features */}
          <div className="form-element">
            <label className={labelClasses}>Core Features (3-5 max)</label>
            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <input 
                    required={index === 0}
                    type="text"
                    placeholder={`Feature ${index + 1}`}
                    className={inputClasses}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  {features.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeFeature(index)}
                      className="border border-smoke px-[20px] text-smoke hover:border-radish-bloom hover:text-radish-bloom transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={addFeature}
                className="self-start text-smoke border-b border-transparent hover:border-smoke hover:text-bone-white transition-all pb-1 font-suisse-intl-webm mt-2"
              >
                + Add another feature
              </button>
            </div>
          </div>
 
          {/* Stack & Scale Row */}
          <div className="flex flex-col md:flex-row gap-8 form-element">
            <div className="flex-1">
              <label className={labelClasses}>Tech Stack (Optional)</label>
              <input 
                type="text"
                placeholder="e.g. Next.js, Prisma, PostgreSQL"
                className={inputClasses}
                value={formData.stack}
                onChange={(e) => setFormData({...formData, stack: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className={labelClasses}>Project Scale</label>
              <select 
                className={`${inputClasses} appearance-none cursor-pointer`}
                value={formData.scale}
                onChange={(e) => setFormData({...formData, scale: e.target.value})}
              >
                <option value="small" className="bg-obsidian">Small (MVP)</option>
                <option value="medium" className="bg-obsidian">Medium (V1 Launch)</option>
                <option value="large" className="bg-obsidian">Large (Enterprise)</option>
              </select>
            </div>
          </div>
 
          <hr className="hairline-divider mt-4 form-element" />
 
          {/* Submit */}
          <div className="pt-4 flex justify-between items-center form-element">
            <p className="thin-label max-w-[300px]">
              Qwen 3.7 Plus will analyze your brief and ask clarifying questions if needed.
            </p>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-pill-outline bg-bone-white text-obsidian font-medium px-[40px] py-[15px] hover:bg-transparent hover:text-bone-white disabled:opacity-50"
            >
              {loading ? "Initializing..." : "Begin Flow →"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
