'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { agents } from '@/lib/agents';

export default function ChatInterface() {
  const [selectedAgent, setSelectedAgent] = useState<string>(agents[0].id);
  const [input, setInput] = useState('');
  
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({
        role: 'user',
        parts: [{ type: 'text', text: input }],
      }, {
        body: {
          agentId: selectedAgent,
        },
      });
      setInput('');
    }
  };

  const isLoading = status === 'submitted' || status === 'streaming';

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Agent Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Choose an Agent:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`p-3 rounded-lg border transition-colors ${
                selectedAgent === agent.id
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{agent.name}</div>
              <div className="text-sm opacity-75">{agent.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="border rounded-lg h-96 overflow-y-auto p-4 mb-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 border'
              }`}
            >
              {message.parts.map((part, index) => (
                <span key={index}>{part.type === 'text' ? part.text : ''}</span>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-3 rounded-lg bg-white text-gray-800 border">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
} 