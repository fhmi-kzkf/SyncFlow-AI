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

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch(`/api/session/${id}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setDocuments(data.documents);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchDocs();
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
          <a 
            href={`/api/session/${id}/export`}
            className="btn-pill-outline bg-bone-white text-obsidian px-[30px]"
          >
            Export All as .ZIP
          </a>
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
