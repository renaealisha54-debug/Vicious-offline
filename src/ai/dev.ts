import { config } from 'dotenv';
config();

import '@/ai/flows/auto-detect-language-flow.ts';
import '@/ai/flows/summarize-selected-notes-flow.ts';
import '@/ai/flows/explain-code-snippet.ts';