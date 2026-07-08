"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type DocStatus = 'idle' | 'generating' | 'done' | 'error';

export default function GenerateDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [statuses, setStatuses] = useState<{
    prd: DocStatus;
    trd: DocStatus;
    schema: DocStatus;
    appflow: DocStatus;
  }>({
    prd: 'idle',
    trd: 'idle',
    schema: 'idle',
    appflow: 'idle',
  });

  const [allDone, setAllDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const generateSequence = async () => {
      // Get state from localStorage
      const storedInput = localStorage.getItem(`session_${id}_input`);
      const storedQA = localStorage.getItem(`session_${id}_qa`);
      
      const payload = {
        formInput: storedInput ? JSON.parse(storedInput) : null,
        clarifyingQA: storedQA ? JSON.parse(storedQA) : []
      };

      const fetchOpts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      };

      // 1. Generate PRD
      setStatuses(s => ({ ...s, prd: 'generating' }));
      try {
        const prdRes = await fetch(`/api/session/${id}/generate/prd`, fetchOpts);
        if (!prdRes.ok) throw new Error("PRD failed");
        const prdData = await prdRes.json();
        const prdContent = prdData.document;
        localStorage.setItem(`session_${id}_prd`, prdContent);
        setStatuses(s => ({ ...s, prd: 'done' }));

        // 2. Generate TRD
        setStatuses(s => ({ ...s, trd: 'generating' }));
        const trdRes = await fetch(`/api/session/${id}/generate/trd`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prdContent })
        });
        if (!trdRes.ok) throw new Error("TRD failed");
        const trdData = await trdRes.json();
        const trdContent = trdData.document;
        localStorage.setItem(`session_${id}_trd`, trdContent);
        setStatuses(s => ({ ...s, trd: 'done' }));

        // 3. Generate Schema
        setStatuses(s => ({ ...s, schema: 'generating' }));
        const schemaRes = await fetch(`/api/session/${id}/generate/schema`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prdContent, trdContent })
        });
        if (!schemaRes.ok) throw new Error("Schema failed");
        const schemaData = await schemaRes.json();
        const schemaContent = schemaData.document;
        localStorage.setItem(`session_${id}_schema`, schemaContent);
        setStatuses(s => ({ ...s, schema: 'done' }));

        // 4. Generate App Flow
        setStatuses(s => ({ ...s, appflow: 'generating' }));
        const appflowRes = await fetch(`/api/session/${id}/generate/appflow`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prd: prdContent, schema: schemaContent })
        });
        if (!appflowRes.ok) throw new Error("App Flow failed");
        const appflowData = await appflowRes.json();
        const appflowContent = appflowData.document;
        localStorage.setItem(`session_${id}_appflow`, appflowContent);
        setStatuses(s => ({ ...s, appflow: 'done' }));

        setAllDone(true);
      } catch (error) {
        console.error("Generation sequence failed", error);
        // Find which one failed and set it to error
        setStatuses(s => {
          const newS = { ...s };
          if (newS.prd === 'generating') newS.prd = 'error';
          else if (newS.trd === 'generating') newS.trd = 'error';
          else if (newS.schema === 'generating') newS.schema = 'error';
          else if (newS.appflow === 'generating') newS.appflow = 'error';
          return newS;
        });
      }
    };

    generateSequence();
  }, [id, hasStarted]);

  const steps = [
    { key: 'prd', label: 'PRD' },
    { key: 'trd', label: 'TRD' },
    { key: 'schema', label: 'Database Schema' },
    { key: 'appflow', label: 'App Flow' },
  ];

  return (
    <div className="w-full flex flex-col items-center pt-[100px] pb-[150px] min-h-[90vh]">
      <div className="w-full max-w-[1000px] px-6 flex flex-col items-center">
        
        <div className="text-center mb-24">
          <span className="thin-label uppercase tracking-widest block mb-4">Orchestration Phase</span>
          <h1 className="display-headline text-[60px]">Synthesizing.</h1>
          <p className="editorial-body text-center mt-6 text-smoke mx-auto">
            Qwen 3.7 Plus is chaining prompts to build your complete specification suite.
            This takes about 30-60 seconds per document.
          </p>
        </div>

        {/* Stepper */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center relative mb-24">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[25px] left-[50px] right-[50px] h-[1px] bg-smoke z-0"></div>
          
          {steps.map((step, index) => {
            const status = statuses[step.key as keyof typeof statuses];
            return (
              <div key={index} className="flex flex-col items-center gap-4 relative z-10 w-full md:w-1/4 mb-8 md:mb-0">
                <div className={`w-[50px] h-[50px] rounded-full border flex items-center justify-center bg-obsidian transition-all duration-500
                  ${status === 'done' ? 'border-bone-white text-bone-white' : 
                    status === 'generating' ? 'border-radish-bloom text-radish-bloom shadow-[0_0_15px_rgba(235,81,109,0.5)]' : 
                    status === 'error' ? 'border-red-500 text-red-500' : 'border-smoke text-smoke'}
                `}>
                  {status === 'done' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  ) : status === 'generating' ? (
                    <div className="w-2 h-2 rounded-full bg-radish-bloom animate-ping"></div>
                  ) : status === 'error' ? (
                    "!"
                  ) : (
                    <span className="font-times-new-roman text-lg">{index + 1}</span>
                  )}
                </div>
                <div className="text-center">
                  <h3 className={`font-suisse-intl-webm text-lg ${status === 'idle' ? 'text-smoke' : 'text-bone-white'}`}>
                    {step.label}
                  </h3>
                  <p className="thin-label text-smoke">
                    {status === 'generating' ? 'Writing...' : status === 'done' ? 'Completed' : status === 'error' ? 'Failed' : 'Waiting'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action area */}
        <div className="h-[100px] flex items-center justify-center">
          {allDone ? (
            <Link 
              href={`/session/${id}/preview`}
              className="bg-radish-bloom text-bone-white uppercase tracking-widest text-[14px] px-[40px] py-[15px] hover:bg-bone-white hover:text-obsidian transition-colors duration-300"
            >
              View Documents
            </Link>
          ) : Object.values(statuses).includes('error') ? (
            <button 
              onClick={() => window.location.reload()}
              className="btn-pill-outline border-red-500 text-red-500"
            >
              Retry Failed Steps
            </button>
          ) : (
            <div className="animate-pulse thin-label text-smoke">
              Please do not close this window...
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
