'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { agents } from '@/lib/agents';
import styles from './ChatInterface.module.scss';

export default function ChatInterface() {
  const [selectedAgent, setSelectedAgent] = useState<string>(agents[0].id);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { messages, sendMessage, status } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: input }],
    }, {
      body: {
        agentId: selectedAgent,
      },
    });
    setInput('');
  };

  const isLoading = status === 'submitted' || status === 'streaming';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const selectedAgentData = agents.find(agent => agent.id === selectedAgent);

  const getAgentColorClass = (agentId: string) => {
    const colorMap = {
      general: 'blue',
      coder: 'green', 
      writer: 'purple',
      analyst: 'orange'
    };
    return colorMap[agentId as keyof typeof colorMap] || 'blue';
  };

  const getAgentIcon = (agentId: string) => {
    switch(agentId) {
      case 'coder': return '👨‍💻';
      case 'writer': return '✍️';
      case 'analyst': return '📊';
      default: return '🤖';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerInner}>
            <div className={styles.headerLeft}>
              <div className={`${styles.agentAvatar} ${styles[getAgentColorClass(selectedAgent)]}`}>
                {getAgentIcon(selectedAgent)}
              </div>
              <div className={styles.headerText}>
                <h1 className={styles.title}>
                  {selectedAgentData?.name || 'AI Assistant'}
                  <Sparkles className={styles.sparkles} />
                </h1>
                <p className={styles.description}>
                  {selectedAgentData?.description || 'Powered by AI SDK'}
                </p>
              </div>
            </div>
            
            {/* Agent Selection Pills */}
            <div className={styles.agentPills}>
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`${styles.agentPill} ${
                    selectedAgent === agent.id 
                      ? `${styles.active} ${styles[getAgentColorClass(agent.id)]}` 
                      : styles.inactive
                  }`}
                >
                  <span className={styles.emoji}>{getAgentIcon(agent.id)}</span>
                  {agent.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messagesSection}>
        <div className={styles.messagesContent}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Bot />
              </div>
              <h3 className={styles.emptyTitle}>
                Ready to help! 
              </h3>
              <p className={styles.emptyDescription}>
                Start a conversation with your selected AI agent. Ask questions, get insights, or just chat!
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${message.role === 'user' ? styles.user : ''}`}
            >
              {/* Avatar */}
              <div
                className={`${styles.messageAvatar} ${
                  message.role === 'user' 
                    ? styles.user 
                    : `${styles.assistant} ${styles[getAgentColorClass(selectedAgent)]}`
                }`}
              >
                {message.role === 'user' ? (
                  <User />
                ) : (
                  <span>{getAgentIcon(selectedAgent)}</span>
                )}
              </div>

              {/* Message Content */}
              <div className={`${styles.messageContent} ${message.role === 'user' ? styles.user : ''}`}>
                <div className={`${styles.messageBubble} ${message.role === 'user' ? styles.user : styles.assistant}`}>
                  <p className={styles.messageText}>
                    {message.parts.map((part, partIndex) => (
                      <span key={partIndex}>{part.type === 'text' ? part.text : ''}</span>
                    ))}
                  </p>
                </div>
                <p className={`${styles.messageTime} ${message.role === 'user' ? styles.user : ''}`}>
                  {formatTime(new Date())}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={styles.loadingMessage}>
              <div className={`${styles.loadingAvatar} ${styles[getAgentColorClass(selectedAgent)]}`}>
                <span>{getAgentIcon(selectedAgent)}</span>
              </div>
              <div className={styles.loadingBubble}>
                <div className={styles.loadingContent}>
                  <Loader2 className={styles.spinner} />
                  <span className={styles.loadingText}>Thinking...</span>
                  <div className={styles.loadingDots}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className={styles.inputSection}>
        <div className={styles.inputContent}>
          <div className={styles.inputForm}>
            <div className={styles.inputWrapper}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                className={styles.input}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className={styles.sendButton}
            >
              <Send />
            </button>
          </div>
          <p className={styles.inputHint}>
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
} 