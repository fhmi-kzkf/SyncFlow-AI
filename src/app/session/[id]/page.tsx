"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`/api/session/${id}/clarify`, {
          method: "POST",
        });
        
        if (!response.ok) {
          throw new Error("Failed to get questions");
        }
        
        const data = await response.json();
        
        if (!data.questions || data.questions.length === 0) {
          // If no questions, proceed straight to generation
          router.push(`/session/${id}/generate`);
          return;
        }
        
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(""));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("An error occurred while connecting to Qwen 3.7 Plus.");
        setLoading(false);
      }
    }
    
    fetchQuestions();
  }, [id, router]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch(`/api/session/${id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      
      if (response.ok) {
        router.push(`/session/${id}/generate`);
      } else {
        throw new Error("Failed to save answers");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save your answers.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <span className="font-times-new-roman text-[40px] text-bone-white mb-4">Consulting Qwen 3.7 Plus...</span>
          <span className="thin-label">Analyzing your brief for ambiguities</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-radish-bloom">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 btn-pill-outline border-radish-bloom text-radish-bloom">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center pt-[100px] pb-[150px] min-h-[90vh]">
      <div className="w-full max-w-[800px] px-6">
        <div className="mb-16">
          <span className="thin-label uppercase tracking-widest block mb-4">Elicitation Phase</span>
          <h1 className="display-headline text-[50px] leading-[1]">A few clarifying questions.</h1>
          <p className="editorial-body mt-6 text-smoke">
            To ensure the orchestrator generates a perfectly aligned specification, 
            Qwen 3.7 Plus needs more detail on these specific points.
          </p>
          <hr className="hairline-divider mt-12" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-16">
          {questions.map((question, index) => (
            <div key={index} className="flex flex-col gap-6">
              <label className="font-times-new-roman text-[28px] text-bone-white leading-tight">
                {question}
              </label>
              <textarea 
                required
                rows={3}
                placeholder="Your answer..."
                className="w-full bg-transparent border-b border-smoke rounded-none px-0 py-4 text-bone-white font-suisse-intl-webm focus:outline-none focus:border-radish-bloom transition-colors placeholder-smoke/50 resize-none"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          ))}

          <hr className="hairline-divider mt-4" />

          <div className="pt-4 flex justify-between items-center">
            <p className="thin-label max-w-[300px]">
              Once answered, the pipeline will orchestrate your documents.
            </p>
            <button 
              type="submit" 
              disabled={submitting}
              className="btn-pill-outline bg-bone-white text-obsidian font-medium px-[40px] py-[15px] hover:bg-transparent hover:text-bone-white disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Proceed to Generation →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
