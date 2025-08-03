# Multi-Agent AI Chat with Next.js and AI SDK

A modern multi-agent chat interface built with Next.js and Vercel's AI SDK, featuring specialized AI agents for different tasks.

## Features

- **Multi-Agent System**: Choose from different specialized AI agents
- **Real-time Streaming**: Live streaming responses using AI SDK
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Agent Specializations**:
  - **General Assistant**: General questions and tasks
  - **Code Assistant**: Programming, debugging, and code review
  - **Writing Assistant**: Writing, editing, and content creation
  - **Data Analyst**: Data analysis and insights

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nextjs-agent
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   └── ChatInterface.tsx         # Main chat component
├── lib/
│   └── agents.ts                 # Agent configurations
└── types/
    ├── agents.ts                 # Agent type definitions
    └── index.ts                  # Type exports
```

## Usage

1. **Select an Agent**: Choose from the available agents based on your task
2. **Start Chatting**: Type your message and press Send
3. **Real-time Responses**: Watch as the AI responds in real-time
4. **Switch Agents**: Change agents mid-conversation for different expertise

## Agent Capabilities

### General Assistant
- General knowledge questions
- Problem solving
- Casual conversation

### Code Assistant
- Programming help
- Debugging assistance
- Code review
- Best practices guidance

### Writing Assistant
- Writing improvement
- Content creation
- Editing suggestions
- Communication skills

### Data Analyst
- Data analysis
- Statistical insights
- Visualization guidance
- Complex concept explanation

## Technologies Used

- **Next.js 15**: React framework with App Router
- **AI SDK**: Vercel's AI SDK for streaming responses
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **OpenAI GPT-4**: Large language model for AI responses

## Development

### Adding New Agents

1. Add agent configuration in `src/lib/agents.ts`:
```typescript
{
  id: 'new-agent',
  name: 'New Agent',
  description: 'Agent description',
  systemPrompt: 'Agent system prompt',
  capabilities: ['capability1', 'capability2'],
}
```

2. The agent will automatically appear in the UI.

### Customizing the Chat Interface

Modify `src/components/ChatInterface.tsx` to customize the UI, add features like:
- Message history
- File uploads
- Agent collaboration
- Custom styling

### API Customization

The chat API in `src/app/api/chat/route.ts` can be extended to:
- Add tool calling
- Implement agent collaboration
- Add conversation memory
- Integrate with external APIs

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue in the repository
- Check the AI SDK documentation
- Review Next.js documentation
