"use client";

import { useEffect, useState, use } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('prisma', typescript); // basic highlighting for prisma

type Tab = 'prd' | 'trd' | 'schema' | 'appflow';

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>('prd');
  const [documents, setDocuments] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadDocs() {
      try {
        const prd = localStorage.getItem(`session_${id}_prd`);
        const trd = localStorage.getItem(`session_${id}_trd`);
        const schema = localStorage.getItem(`session_${id}_schema`);
        const appflow = localStorage.getItem(`session_${id}_appflow`);
        
        if (!prd && !trd && !schema && !appflow) {
           setDocuments(null);
           setLoading(false);
           return;
        }

        setDocuments({
          prd: { content: prd },
          trd: { content: trd },
          schema: { content: schema },
          appflow: { content: appflow }
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    loadDocs();
  }, [id]);

  const handleDownload = (filename: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const handleExportAll = async () => {
    try {
      const prd = localStorage.getItem(`session_${id}_prd`);
      const trd = localStorage.getItem(`session_${id}_trd`);
      const schema = localStorage.getItem(`session_${id}_schema`);
      const appflow = localStorage.getItem(`session_${id}_appflow`);

      const res = await fetch(`/api/session/${id}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prd, trd, schema, appflow })
      });
      
      if (!res.ok) throw new Error("Failed to generate ZIP");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `syncflow-docs-${id}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to export documents");
    }
  const handleCopyPrompt = async () => {
    try {
      const prd = localStorage.getItem(`session_${id}_prd`) || "";
      const trd = localStorage.getItem(`session_${id}_trd`) || "";
      const schema = localStorage.getItem(`session_${id}_schema`) || "";
      const appflow = localStorage.getItem(`session_${id}_appflow`) || "";

      const promptText = `Here is the complete specification suite for my application. Please use this context to help me build it:

# 1. Product Requirements Document (PRD)
${prd}

# 2. Technical Requirements Document (TRD)
${trd}

# 3. Database Schema (Prisma)
\`\`\`prisma
${schema}
\`\`\`

# 4. App Flow & Screen Inventory
${appflow}
`;
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy prompt to clipboard");
    }
  };

  if (loading) {
    return <div className="w-full min-h-[70vh] flex items-center justify-center font-times-new-roman text-[32px]">Loading Vault...</div>;
  }

  if (!documents) {
    return <div className="w-full min-h-[70vh] flex items-center justify-center text-radish-bloom">Documents not found.</div>;
  }

  const tabs: { key: Tab, label: string, filename: string }[] = [
    { key: 'prd', label: 'PRD', filename: 'PRD.md' },
    { key: 'trd', label: 'TRD', filename: 'TRD.md' },
    { key: 'schema', label: 'Schema', filename: 'schema.prisma' },
    { key: 'appflow', label: 'App Flow', filename: 'AppFlow.md' },
  ];

  return (
    <div className="w-full flex flex-col items-center pt-[50px] pb-[100px] min-h-[90vh]">
      <div className="w-full max-w-[1000px] px-6">
        
        {/* Header & Export */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <span className="thin-label uppercase tracking-widest block mb-4">The Result</span>
            <h1 className="display-headline text-[50px]">Specifications.</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleCopyPrompt}
              className="btn-pill-outline border-radish-bloom text-radish-bloom px-[30px] hover:bg-radish-bloom hover:text-bone-white transition-colors"
            >
              {copied ? "Copied to Clipboard!" : "Copy as Prompt"}
            </button>
            <button 
              onClick={handleExportAll}
              className="btn-pill-outline bg-bone-white text-obsidian px-[30px]"
            >
              Export All as .ZIP
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-smoke mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-4 font-suisse-intl-webm text-[18px] transition-colors ${
                activeTab === tab.key 
                  ? "text-bone-white border-b-2 border-bone-white bg-graphite/20" 
                  : "text-smoke hover:text-bone-white hover:bg-graphite/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content & Individual Download */}
        <div className="bg-[#111111] border border-smoke p-8 relative">
          <button 
            onClick={() => handleDownload(
              tabs.find(t => t.key === activeTab)?.filename || 'document.txt',
              documents[activeTab]?.content || ''
            )}
            className="absolute top-8 right-8 ghost-nav-link text-radish-bloom border border-radish-bloom rounded-full px-4 py-1 text-sm hover:bg-radish-bloom hover:text-bone-white"
          >
            Download {tabs.find(t => t.key === activeTab)?.label}
          </button>
          
          <div className="prose prose-invert prose-p:font-suisse-intl-webm prose-headings:font-times-new-roman max-w-none mt-12 pr-4 overflow-x-auto">
            {activeTab === 'schema' ? (
              <SyntaxHighlighter 
                language="typescript" 
                style={vscDarkPlus}
                customStyle={{ background: 'transparent', margin: 0, padding: 0 }}
              >
                {documents.schema.content || '// Schema failed to generate'}
              </SyntaxHighlighter>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const {children, className, node, ref, ...rest} = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={vscDarkPlus}
                      />
                    ) : (
                      <code {...rest} ref={ref} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {documents[activeTab]?.content || `*${tabs.find(t => t.key === activeTab)?.label} failed to generate*`}
              </ReactMarkdown>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
