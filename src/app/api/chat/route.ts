import { UIMessage } from 'ai';

import { chatService } from '@/lib/ChatService';

export async function POST(req: Request) {
  try {
    const {
      messages,
      sessionId,
    }: {
      messages: UIMessage[];
      sessionId?: string;
    } = await req.json();

    const result = await chatService.processRequest(messages, sessionId);
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
