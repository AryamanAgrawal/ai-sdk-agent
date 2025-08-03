import { UIMessage } from 'ai';

import { chatService } from '@/lib/ChatService';

export async function POST(req: Request) {
  console.log('📨 [API] Incoming chat request');
  try {
    const requestBody = await req.json();
    console.log('📋 [API] Request body parsed successfully');

    const {
      messages,
      sessionId,
    }: {
      messages: UIMessage[];
      sessionId?: string;
    } = requestBody;

    console.log(
      `💬 [API] Processing ${messages.length} messages for session: ${sessionId || 'default'}`
    );
    const lastMessage = messages[messages.length - 1];
    console.log('🔍 [API] Last message preview:', {
      role: lastMessage?.role,
      contentLength:
        lastMessage &&
        'content' in lastMessage &&
        typeof lastMessage.content === 'string'
          ? lastMessage.content.length
          : 0,
    });

    const result = await chatService.processRequest(messages, sessionId);
    console.log(
      '✅ [API] Chat processing completed, returning stream response'
    );
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('❌ [API] Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
