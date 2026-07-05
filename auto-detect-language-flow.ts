'use server';
/**
 * @fileOverview An AI agent that detects the programming language or text type of a given content.
 *
 * - autoDetectLanguage - A function that handles the language detection process.
 * - AutoDetectLanguageInput - The input type for the autoDetectLanguage function.
 * - AutoDetectLanguageOutput - The return type for the autoDetectLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoDetectLanguageInputSchema = z.object({
  text: z.string().describe('The content for which to detect the programming language or text type.'),
});
export type AutoDetectLanguageInput = z.infer<typeof AutoDetectLanguageInputSchema>;

const AutoDetectLanguageOutputSchema = z.object({
  language: z.string().describe('The detected programming language or text type (e.g., "JavaScript", "Python", "Markdown", "Plain Text").'),
});
export type AutoDetectLanguageOutput = z.infer<typeof AutoDetectLanguageOutputSchema>;

export async function autoDetectLanguage(input: AutoDetectLanguageInput): Promise<AutoDetectLanguageOutput> {
  return autoDetectLanguageFlow(input);
}

const detectLanguagePrompt = ai.definePrompt({
  name: 'autoDetectLanguagePrompt',
  input: {schema: AutoDetectLanguageInputSchema},
  output: {schema: AutoDetectLanguageOutputSchema},
  prompt: `You are an expert language classifier. Analyze the following text content and determine the most appropriate programming language or text type. Respond with only the name of the language or type.

Examples:
Input: console.log("Hello, World!");
Output: JavaScript

Input: # My Document\nThis is a markdown file.
Output: Markdown

Input: print("Hello, Python!")
Output: Python

Input: Just a simple note.
Output: Plain Text

Input: <?php echo 'Hello, PHP!'; ?>
Output: PHP

Input: SELECT * FROM users;
Output: SQL

Input: {\"key\": \"value\"}
Output: JSON

Input: func main() { fmt.Println("Hello, Go!") }
Output: Go

Input: package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, Go!")\n}
Output: Go

Input: public class MyClass { public static void main(String[] args) { System.out.println("Hello, Java!"); } }
Output: Java

Content:
{{{text}}}`,
});

const autoDetectLanguageFlow = ai.defineFlow(
  {
    name: 'autoDetectLanguageFlow',
    inputSchema: AutoDetectLanguageInputSchema,
    outputSchema: AutoDetectLanguageOutputSchema,
  },
  async input => {
    const {output} = await detectLanguagePrompt(input);
    return output!;
  }
);
