'use server';
/**
 * @fileOverview A Genkit flow for explaining code snippets.
 *
 * - explainCodeSnippet - A function that explains a given code snippet.
 * - ExplainCodeSnippetInput - The input type for the explainCodeSnippet function.
 * - ExplainCodeSnippetOutput - The return type for the explainCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeSnippetInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to be explained.'),
});
export type ExplainCodeSnippetInput = z.infer<typeof ExplainCodeSnippetInputSchema>;

const ExplainCodeSnippetOutputSchema = z.object({
  explanation: z.string().describe('A clear and concise explanation of the code snippet.'),
});
export type ExplainCodeSnippetOutput = z.infer<typeof ExplainCodeSnippetOutputSchema>;

export async function explainCodeSnippet(input: ExplainCodeSnippetInput): Promise<ExplainCodeSnippetOutput> {
  return explainCodeSnippetFlow(input);
}

const explainPrompt = ai.definePrompt({
  name: 'explainCodeSnippetPrompt',
  input: {schema: ExplainCodeSnippetInputSchema},
  output: {schema: ExplainCodeSnippetOutputSchema},
  prompt: `You are an AI assistant specialized in explaining code snippets clearly and concisely. Your goal is to help users understand complex code without leaving their editor.

Explain the following code snippet, focusing on its functionality and purpose:

\`\`\`
{{{codeSnippet}}}
\`\`\`

Provide the explanation in a way that is easy to understand for developers.`,
});

const explainCodeSnippetFlow = ai.defineFlow(
  {
    name: 'explainCodeSnippetFlow',
    inputSchema: ExplainCodeSnippetInputSchema,
    outputSchema: ExplainCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await explainPrompt(input);
    return output!;
  }
);
