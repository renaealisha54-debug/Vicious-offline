'use client';

import { useState } from 'react';
import { callGroq } from '@/ai/genkit';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [busy, setBusy] = useState(false);

  async function run(systemPrompt: string) {
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      const output = await callGroq(text, { systemPrompt });
      setResult(output);
    } catch (err) {
      setResult(`Error: ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  function exportFile(ext: 'md' | 'txt') {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `note.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-2xl p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-headline font-semibold">Vicious Offline</h1>
      </header>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start writing or paste code..."
        className="min-h-[240px] rounded-lg border border-input bg-card p-3 font-code text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="flex flex-wrap gap-2">
        <button
          disabled={!text.trim() || busy}
          onClick={() => run('Summarize the following text concisely and accurately. Focus on the main points and omit any extraneous details.')}
          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          Summarize
        </button>
        <button
          disabled={!text.trim() || busy}
          onClick={() => run('Explain the following code snippet clearly and concisely for someone reading it for the first time.')}
          className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground disabled:opacity-50"
        >
          Explain code
        </button>
        <button
          disabled={!text.trim() || busy}
          onClick={() => run('You are an expert language classifier. Respond with only the name of the programming language or text type.')}
          className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground disabled:opacity-50"
        >
          Detect language
        </button>
        <button
          disabled={!text.trim()}
          onClick={() => exportFile('md')}
          className="rounded-md border border-input px-3 py-2 text-sm font-medium"
        >
          Export .md
        </button>
        <button
          disabled={!text.trim()}
          onClick={() => exportFile('txt')}
          className="rounded-md border border-input px-3 py-2 text-sm font-medium"
        >
          Export .txt
        </button>
      </div>

      {result && (
        <div className="rounded-lg border border-input bg-card p-3 text-sm whitespace-pre-wrap">
          {result}
        </div>
      )}
    </main>
  );
}
