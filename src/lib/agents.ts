import { AgentDefinition } from '@/types/agents';

import { tool } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { Experimental_Agent as Agent, stepCountIs } from 'ai';

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
    content: z.string(),
  }),
  execute: async ({ content }) => {
    const writingAgent = getWritingAgent();
    const result = await writingAgent.run(content);
    return result;
  },
});

export const getWritingAgent = () => {
  const writingAgent = new Agent({
    model: openai('gpt-4.1'),
    system:
      'You are a writing agent. You specialise in writing literature, poetry, and creative writing.',
    stopWhen: stepCountIs(2),
    tools: {
      /* Your tools */
    },
  });

  return {
    run: async (content: string) => {
      const result = writingAgent.stream({ prompt: content });
      return result;
    },
  };
};
