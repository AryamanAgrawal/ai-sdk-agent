import { tool } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { Experimental_Agent as Agent, stepCountIs } from 'ai';

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
    content: z.string(),
  }),
  execute: async ({ content }) => {
    console.log('🖊️ [WritingTool] Executing writing agent tool');
    console.log(
      `📝 [WritingTool] Content length: ${content.length} characters`
    );

    const writingAgent = getWritingAgent();
    console.log('🤖 [WritingTool] Writing agent created, running content...');

    const result = await writingAgent.run(content);
    console.log('✅ [WritingTool] Writing agent execution completed');

    return result;
  },
});

export const getWritingAgent = () => {
  console.log('🏗️ [Agent] Creating writing agent with gpt-4.1 model');
  console.log(
    '📜 [Agent] System prompt: Writing specialist for literature, poetry, and creative writing'
  );

  const writingAgent = new Agent({
    model: openai('gpt-4.1'),
    system:
      'You are a writing agent. You specialise in writing literature, poetry, and creative writing.',
    stopWhen: stepCountIs(2),
    tools: {
      /* Your tools */
    },
  });

  console.log('✅ [Agent] Writing agent created successfully');

  return {
    run: async (content: string) => {
      console.log(
        `🌊 [Agent] Starting writing agent stream for content: ${content.substring(0, 100)}...`
      );
      const result = writingAgent.stream({ prompt: content });
      console.log('📡 [Agent] Writing agent stream initiated');
      return result;
    },
  };
};
