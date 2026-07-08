export interface FormInput {
  idea: string;
  targetUser: string;
  features: string[];
  stack: string;
  scale: string;
}

export interface Session {
  sessionId: string;
  createdAt: number;
  formInput: FormInput;
  clarifyingQA: { question: string; answer: string }[];
  documents: {
    prd: { status: 'idle' | 'generating' | 'done'; content: string | null };
    trd: { status: 'idle' | 'generating' | 'done'; content: string | null };
    schema: { status: 'idle' | 'generating' | 'done'; content: string | null };
    appflow: { status: 'idle' | 'generating' | 'done'; content: string | null };
  };
}

// In-memory store for sessions (hackathon scope)
// In a real app, this would be a database like PostgreSQL or Redis
class SessionStore {
  private sessions = new Map<string, Session>();

  private cleanup() {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const now = Date.now();
    for (const [id, session] of this.sessions.entries()) {
      if (now - session.createdAt > ONE_DAY) {
        this.sessions.delete(id);
      }
    }
  }

  createSession(sessionId: string, formInput: FormInput): Session {
    this.cleanup(); // Prevent memory leak by removing old sessions
    const session: Session = {
      sessionId,
      createdAt: Date.now(),
      formInput,
      clarifyingQA: [],
      documents: {
        prd: { status: 'idle', content: null },
        trd: { status: 'idle', content: null },
        schema: { status: 'idle', content: null },
        appflow: { status: 'idle', content: null },
      },
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  updateSession(sessionId: string, updates: Partial<Session>) {
    const existing = this.sessions.get(sessionId);
    if (existing) {
      this.sessions.set(sessionId, { ...existing, ...updates });
    }
  }
  
  updateDocumentStatus(
    sessionId: string, 
    docType: keyof Session['documents'], 
    status: 'idle' | 'generating' | 'done',
    content: string | null = null
  ) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.documents[docType] = { status, content: content !== null ? content : session.documents[docType].content };
      this.sessions.set(sessionId, session);
    }
  }
}

// Singleton instance
export const sessionStore = new SessionStore();
