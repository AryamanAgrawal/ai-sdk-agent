'use client';

import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Multi-Agent AI Chat
        </h1>
        <ChatInterface />
      </div>
    </div>
  );
}
