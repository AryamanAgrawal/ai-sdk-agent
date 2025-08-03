import { generateText, tool } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

export interface AgentDefinition {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  avatar?: string;
  capabilities?: string[];
}

export const agents: AgentDefinition[] = [
  {
    id: 'general',
    name: 'General Assistant',
    description: 'A helpful AI assistant for general questions and tasks',
    systemPrompt:
      'You are a helpful AI assistant. Provide clear, accurate, and helpful responses to user questions.',
    capabilities: ['general knowledge', 'problem solving', 'conversation'],
  },
  {
    id: 'writer',
    name: 'Writing Assistant',
    description: 'Helps with writing, editing, and content creation',
    systemPrompt:
      'You are a professional writer and editor. Help users improve their writing, create engaging content, and refine their communication skills. Provide constructive feedback and suggestions.',
    capabilities: ['writing', 'editing', 'content creation', 'communication'],
  },
];

export const writingAgentTool = tool({
  description: 'An AI Agent that can deliberate on writing content',
  inputSchema: z.object({
    query: z.string(),
  }),
  execute: async ({ query }) => {
    console.log('🖊️ [WritingTool] Executing writing agent tool', query);

    const writingAgent = getWritingAgent();
    console.log('🤖 [WritingTool] Writing agent created, running content...');

    const result = await writingAgent.run(query);
    console.log('✅ [WritingTool] Writing agent execution completed');

    return result.text; // Return the actual text content
  },
});

export const getWritingAgent = () => {
  return {
    run: async (query: string) => {
      console.log(
        `🌊 [Agent] Starting writing agent generation for content: ${query.substring(0, 100)}...`
      );
      const result = await generateText({
        model: openai('gpt-4.1'),
        system:
          'You are a professional writer and editor. Help users improve their writing, create engaging content, and refine their communication skills. Provide constructive feedback and suggestions.',
        prompt: query,
      });

      return result;
    },
  };
};
