// src/lib/AgentService.ts
import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from 'ai';
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
      console.log('🤖 [ChatService] Selecting agent...');
      const agentDefinition = agents[0];
      console.log(
        `✅ [ChatService] Agent selected: ${agentDefinition.name} (${agentDefinition.id})`
      );

      // Add context to system prompt
      console.log('📝 [ChatService] Building system prompt...');
      let systemPrompt = agentDefinition.systemPrompt;
      if (Object.keys(session.variables).length > 0) {
        systemPrompt += `\n\nContext: ${JSON.stringify(session.variables)}`;
        console.log('📋 [ChatService] Added session context to system prompt');
      }
      console.log(
        `📏 [ChatService] System prompt length: ${systemPrompt.length} characters`
      );

      console.log('🔄 [ChatService] Converting messages for model...');
      const modelMessages = convertToModelMessages(messages);
      console.log(
        `✅ [ChatService] Messages converted: ${messages.length} -> ${modelMessages.length}`
      );

      // Stream response
      console.log('🌊 [ChatService] Starting streaming with model: gpt-4.1');
      console.log('🛠️ [ChatService] Available tools: writingAgentTool');

      const result = streamText({
        model: openai('gpt-4.1'),
        system: systemPrompt,
        messages: modelMessages,
        stopWhen: stepCountIs(2),
        tools: {
          writingAgentTool,
        },
        onStepFinish: ({ text }) => {
          console.log('🔄 [ChatService] Step finished:', JSON.stringify(text));
          modelMessages.push({
            role: 'assistant',
            content: text,
          });
        },
      });

      // Close session after streaming is complete
      console.log(
        `🧹 [ChatService] Scheduling session cleanup for: ${sessionId}`
      );
      this.closeSession(sessionId);

      console.log('✨ [ChatService] Chat processing completed successfully:');
      return result;
    } catch (error) {
      console.error('💥 [ChatService] AgentService error:', error);
      throw error;
    }
  }

  // Private helper methods
  private getOrCreateSession(sessionId: string): Session {
    if (!this.sessions.has(sessionId)) {
      console.log(`📂 [ChatService] Creating new session: ${sessionId}`);
      this.sessions.set(sessionId, {
        id: sessionId,
        variables: {},
      });
    } else {
      console.log(`📂 [ChatService] Using existing session: ${sessionId}`);
    }
    return this.sessions.get(sessionId)!;
  }

  /**
   * Close and remove a session by its ID.
   * @param sessionId The ID of the session to close.
   */
  closeSession(sessionId: string): void {
    console.log(`🗑️ [ChatService] Closing session: ${sessionId}`);
    this.sessions.delete(sessionId);
    console.log(
      `📊 [ChatService] Active sessions remaining: ${this.sessions.size}`
    );
  }
}

// Export singleton instance
export const chatService = new ChatService();
