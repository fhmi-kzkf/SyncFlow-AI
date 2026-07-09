---
theme: default
title: SyncFlow AI
---

# SyncFlow AI
**Automated Spec Orchestrator**

*Bridging the gap between raw ideas and developer-ready code.*

---

## 🛑 The Problem

Building a new product starts with a chaotic transition from a visionary idea to structured engineering requirements.

- **Time Consuming:** Founders spend weeks drafting PRDs, TRDs, and database schemas.
- **The "Blank Page" Paralysis:** It's hard to know what details developers actually need.
- **Misalignment:** Vague ideas lead to poor technical architecture and wasted engineering hours.

---

## ✨ The Solution: SyncFlow AI

**An AI-powered product orchestrator.** 

SyncFlow AI interviews you like a senior Product Manager, clarifies your vision, and automatically generates a comprehensive suite of development documents in minutes.

- **No more blank pages.**
- **Perfect alignment** between business goals and technical execution.
- **Ready for AI coders** (Cursor, v0, Bolt) instantly.

---

## ⚙️ How It Works: Phase 1
### The Elicitation Phase

You provide a simple 1-sentence idea. Our orchestrator, powered by **Qwen 3.7 Plus**, dynamically generates context-aware clarifying questions.

*Example:* 
> "If you are building an MVP without user accounts, how should the system handle data retention to prevent database bloat?"

You answer, the AI learns.

---

## 🧠 How It Works: Phase 2
### The Orchestration Phase (Prompt Chaining)

SyncFlow AI uses a sequential **Prompt Chaining Architecture**. The output of one step becomes the strict context for the next:

1. **PRD (Product Requirements):** Defines features & user stories.
2. **TRD (Technical Requirements):** Chooses the architecture based on the PRD.
3. **Database Schema:** Writes strict Prisma schema based on the TRD.
4. **App Flow:** Maps the UI screens based on the Schema.

---

## 💻 The Final Deliverable

Within 60 seconds, you receive:
- A downloadable `.ZIP` file containing markdown and `.prisma` files.
- A **"Copy as Prompt"** feature that bundles the entire specification suite into one massive prompt.

*Paste it into Cursor, and watch your app build itself.*

---

## 🛠 Tech Stack & Architecture

- **Frontend:** Next.js, React, Tailwind CSS
- **State Management:** Stateless Architecture (LocalStorage Bridge)
- **AI Engine:** Fireworks AI (Qwen 3.7 Plus)
- **Deployment:** Vercel Serverless Functions
- **Processing:** JSZip for client-side compression

*Fully stateless. Highly scalable. Zero database required.*

---

## 🚀 Future Roadmap

- **GitHub Integration:** Automatically push generated specs as a PR to a repository.
- **Jira/Linear Sync:** Convert PRD User Stories directly into actionable Kanban tickets.
- **Multi-Agent Debate:** Add an "Engineering Lead AI" to debate the "PM AI" before finalizing the TRD.

---

# Thank You!
**Let's build faster.** 
