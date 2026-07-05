/**
 * @fileOverview Client for the Vicious Offline proxy worker.
 * The worker holds the real GROQ_API_KEY server-side; this app only
 * knows the public worker URL, so no secret is baked into the APK.
 */

const WORKER_URL =
  process.env.NEXT_PUBLIC_WORKER_URL ||
  'https://vicious-offline-proxy.yourname.workers.dev';

interface GroqCallOptions {
  systemPrompt?: string;
  jsonMode?: boolean;
}

export async function callGroq(
  userPrompt: string,
  options: GroqCallOptions = {}
): Promise<string> {
  const messages: {role: string; content: string}[] = [];
  if (options.systemPrompt) {
    messages.push({role: 'system', content: options.systemPrompt});
  }
  messages.push({role: 'user', content: userPrompt});

  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      messages,
      temperature: 0.3,
      jsonMode: options.jsonMode ?? false,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Worker error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Worker returned no content.');
  }
  return content;
}
