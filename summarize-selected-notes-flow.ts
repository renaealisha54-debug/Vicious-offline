'use server';
/**
 * @fileOverview A Genkit flow for summarizing selected text from a user's workspace.
 *
 * - summarizeSelectedNotes - A function that takes a block of text and returns a concise summary.
 * - SummarizeSelectedNotesInput - The input type for the summarizeSelectedNotes function.
 * - SummarizeSelectedNotesOutput - The return type for the summarizeSelectedNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSelectedNotesInputSchema = z.object({
  text: z.string().describe('The text block to be summarized.'),
});
export type SummarizeSelectedNotesInput = z.infer<
  typeof SummarizeSelectedNotesInputSchema
>;

const SummarizeSelectedNotesOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the provided text.'),
});
export type SummarizeSelectedNotesOutput = z.infer<
  typeof SummarizeSelectedNotesOutputSchema
>;

export async function summarizeSelectedNotes(
  input: SummarizeSelectedNotesInput
): Promise<SummarizeSelectedNotesOutput> {
  return summarizeSelectedNotesFlow(input);
}

const summarizePrompt = ai.definePrompt({
  name: 'summarizeSelectedNotesPrompt',
  input: {schema: SummarizeSelectedNotesInputSchema},
  output: {schema: SummarizeSelectedNotesOutputSchema},
  prompt: `Summarize the following text concisely and accurately. Focus on the main points and omit any extraneous details. Ensure the summary is easy to understand and captures the core message.

Text to summarize: """{{{text}}}"""`,
});

const summarizeSelectedNotesFlow = ai.defineFlow(
  {
    name: 'summarizeSelectedNotesFlow',
    inputSchema: SummarizeSelectedNotesInputSchema,
    outputSchema: SummarizeSelectedNotesOutputSchema,
  },
  async (input) => {
    const {output} = await summarizePrompt(input);
    return output!;
  }
);
