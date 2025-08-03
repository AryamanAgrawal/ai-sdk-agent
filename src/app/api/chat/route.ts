import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { agents } from '@/lib/agents';

export async function POST(req: Request) {
  try {
    const { messages, agentId }: { messages: UIMessage[]; agentId?: string } = await req.json();
    
    // Find the selected agent or default to the first one
    const selectedAgent = agents.find(agent => agent.id === agentId) || agents[0];
    
    const result = streamText({
      model: openai('gpt-4o'),
      system: selectedAgent.systemPrompt,
      messages: convertToModelMessages(messages),
    });    

    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 