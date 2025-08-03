// src/lib/AgentService.ts
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { agents, writingAgentTool } from './agents';

interface Session {
  id: string;
  variables: Record<string, unknown>;
}

export class ChatService {
  private sessions = new Map<string, Session>();

  // Main entry point - process chat messages with intelligent agent selection
  async processRequest(messages: UIMessage[], sessionId: string = 'default') {
    try {
      // Get or create session
      const session = this.getOrCreateSession(sessionId);

      // Execute with selected agent
      const agent = agents.find(a => a.id === 'general') || agents[0];

      // Add context to system prompt
      let systemPrompt = agent.systemPrompt;
      if (Object.keys(session.variables).length > 0) {
        systemPrompt += `\n\nContext: ${JSON.stringify(session.variables)}`;
      }

      const modelMessages = convertToModelMessages(messages);

      // Stream response
      const result = streamText({
        model: openai('gpt-4.1'),
        system: systemPrompt,
        messages: modelMessages,
        tools: {
          writingAgentTool,
        },
      });

      // Close session after streaming is complete
      this.closeSession(sessionId);

      return result;
    } catch (error) {
      console.error('AgentService error:', error);
      throw error;
    }
  }

  // Private helper methods
  private getOrCreateSession(sessionId: string): Session {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        id: sessionId,
        variables: {},
      });
    }
    return this.sessions.get(sessionId)!;
  }

  /**
   * Close and remove a session by its ID.
   * @param sessionId The ID of the session to close.
   */
  closeSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}

// Export singleton instance
export const chatService = new ChatService();
