import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { agents } from '@/lib/agents';

export async function POST(req: Request) {
  try {
    const { messages, agentId } = await req.json();
    
    // Find the selected agent
    const agent = agents.find(a => a.id === agentId) || agents[0];
    
    // Create the conversation with the agent's system prompt
    const result = await streamText({
      model: openai('gpt-4'),
      messages: [
        { role: 'system', content: agent.systemPrompt },
        ...messages
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 