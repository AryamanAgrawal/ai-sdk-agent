# AI Multi-Agent Chat

A modern, beautiful chat interface for interacting with specialized AI agents built with Next.js 15, TypeScript, and SCSS modules.

## Features

🤖 **Multi-Agent Support**: Choose from specialized AI agents:

- **General Assistant**: For general questions and tasks
- **Code Assistant**: Specialized in programming and debugging
- **Writing Assistant**: Helps with writing and content creation
- **Data Analyst**: Expert in data analysis and insights

🎨 **Modern UI**:

- Clean, minimal design with SCSS modules
- Gradient backgrounds and smooth animations
- Color-coded agent personalities
- Responsive design for all screen sizes
- Professional chat bubbles with shadows

⚡ **Features**:

- Real-time streaming responses
- Auto-scroll to latest messages
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Loading states with animated indicators
- Agent-specific system prompts for contextual responses

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **Styling**: SCSS Modules (removed Tailwind for better control)
- **AI SDK**: Vercel AI SDK with OpenAI
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts     # Chat API endpoint
│   ├── globals.css           # Global CSS reset and base styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── ChatInterface.tsx           # Main chat component
│   └── ChatInterface.module.scss   # SCSS module styles
├── lib/
│   └── agents.ts             # Agent configurations
└── types/
    ├── agents.ts             # Agent type definitions
    └── index.ts              # Type exports
```

## Styling Architecture

The application uses **SCSS modules** for styling, providing:

- **Scoped styles**: No global CSS conflicts
- **Variables**: Consistent colors, spacing, and shadows
- **Responsive design**: Mobile-first approach
- **Animations**: Smooth transitions and loading states
- **Modern CSS**: Gradients, shadows, and backdrop effects

## Agent Configuration

Each agent has:

- **Unique personality**: Color-coded with emoji icons
- **System prompts**: Specialized context for different tasks
- **Capabilities**: Defined skill sets
- **Visual identity**: Consistent theming throughout the interface

## Development

- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## License

MIT License - feel free to use this project as a starting point for your own AI chat applications!
