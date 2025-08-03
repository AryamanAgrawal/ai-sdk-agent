export interface AgentDefinition {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  avatar?: string;
  capabilities?: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agentId?: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  selectedAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentResponse {
  agentId: string;
  content: string;
  confidence?: number;
  tools?: string[];
}
