# SyncFlow ✦ AI

SyncFlow is an advanced agentic AI orchestration platform designed to automate and streamline the software development lifecycle. By dynamically eliciting product requirements, SyncFlow orchestrates prompt chaining across multiple LLMs to instantly generate comprehensive Product Requirements Documents (PRD), Technical Requirements Documents (TRD), Database Schemas, and App Flow maps.

## Features

- **Dynamic Elicitation**: An intelligent PM Agent that analyzes your brief and asks clarifying questions only when critical ambiguities exist.
- **Sequential Prompt Chaining**: Automates the pipeline. The PRD feeds into the TRD, which feeds into the Database Schema—ensuring zero divergence between product and engineering specs.
- **Prisma Schemas**: Generates clean, production-ready Prisma database schemas.
- **App Flow Map**: Maps user journeys and screen inventories for immediate handoff to design teams.
- **Export Ready**: Download your complete document suite as a `.zip` archive, ready to be pushed to your repository.

## Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS v4 & Custom CSS with GSAP Animations
- **AI Integration**: Fireworks AI (Qwen 3.7 Plus & Llama 3)
- **Architecture**: Modular Agentic Pipeline & Dynamic Document Generation

## Getting Started

### Prerequisites

Ensure you have Node.js (v18+) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/syncflow-ai.git
   cd syncflow-ai/app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   The project uses a `.env` file. Add your Fireworks API key:
   ```env
   FIREWORKS_API_KEY=your_fireworks_api_key_here
   ```
   *(Note: Never commit your `.env` file to version control)*

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Overview

SyncFlow leverages a modular pipeline to ensure high-quality software specifications:
- **Elicitation Engine**: Analyzes user input to dynamically detect missing context.
- **Document Generators**: Dedicated modules for PRD, TRD, and Schema generation.
- **In-Memory Store**: Fast, lightweight session management for seamless user experiences during generation.

## License

This project is licensed under the MIT License.
