# Vicious Offline

A focused, AI-powered offline text workspace. Write notes and code snippets with local-first storage, export to `.txt` or `.md`, and use built-in AI tools to summarize or explain selected content.

## Features

- **Intelligent Text Workspace** — Markdown and plain text editor with auto-save to localStorage
- **AI Content Assistant** — Summarize selected notes or explain code snippets via Gemini
- **Language Detection** — Auto-classify the programming language or text type of your document
- **File Portability** — Export any snapshot as `.txt` or `.md`
- **Draft Snapshots** — Persist multiple documents locally, no account required

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Genkit](https://firebase.google.com/docs/genkit) + [Gemini 2.5 Flash](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- TypeScript

## Getting Started

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your Gemini API key:
   ```bash
   cp .env.example .env
   ```
   Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey).

4. Run the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server (port 9002) |
| `npm run build` | Production build |
| `npm run genkit:dev` | Start Genkit AI dev UI |
| `npm run typecheck` | TypeScript check without emit |

## Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Required. Your Google Gemini API key. |
