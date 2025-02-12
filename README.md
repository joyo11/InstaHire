# InstaHire

## Overview
InstaHire is an AI-powered interview chatbot built with Next.js and TypeScript. It conducts automated technical interviews for Full Stack Software Engineer positions, providing a seamless and interactive experience. The chatbot assesses candidates' technical skills, experience, and cultural fit through natural conversation.

## Features
- **AI-Powered Interviews**: Conducts natural conversations using OpenAI's GPT model
- **Real-Time Chat**: Interactive chat interface with typing animations
- **Session Management**: Save and resume interview sessions
- **Dark/Light Theme**: Customizable UI themes for better accessibility
- **Conversation History**: Access past interview sessions
- **Smart Validation**: Validates responses for technical requirements
- **Responsive Design**: Works seamlessly across devices
- **FAQ Section**: Built-in help and frequently asked questions
- **Interview Analytics**: Track candidate responses and progress

## Technologies Used
- **Next.js**: React framework for production
- **TypeScript**: Type-safe development
- **Prisma**: Database ORM with SQLite
- **OpenAI API**: GPT-3.5 for natural conversations
- **TailwindCSS**: Utility-first CSS framework
- **Lucide Icons**: Modern icon library
- **SQLite**: Local database storage

## Prerequisites
- Node.js 16.0+
- npm or yarn
- OpenAI API key
- Git (optional)

## Setup
1. Clone the Repository

```bash
git clone https://github.com/joyo11/InstaHire.git

```

Or download ZIP from https://github.com/joyo11/InstaHire

2. Environment Setup
Create a `.env` file in the root directory:

Add the following lines:

```bash
DATABASE_URL="file:./prisma/db.sqlite"
OPENAI_API_KEY=your_api_key_here
```

3. Install Dependencies
```bash
npm install openai@4.24.1

rm -rf .next

npm install

npx prisma generate

npx prisma migrate dev --name init

npm run dev


```

4. Start Development Server
```bash
npm run dev
```

Access at http://localhost:3000

## Code Structure

### Components
- `ChatInterface.tsx`: Main chat interface component
- `Logo.tsx`: Application logo component

### Services
- `openaiService.ts`: OpenAI integration and response handling
- `interviewService.ts`: Interview logic and flow management

### Pages
- `index.tsx`: Main application page
- `api/`: API routes for chat and session management

### Database
- `schema.prisma`: Database schema definition
- `db.sqlite`: Local SQLite database

## Features in Detail

1. **Interview Flow**
   - Initial greeting and role introduction
   - Technical skills assessment
   - Experience validation
   - Project discussion
   - Salary and logistics alignment

2. **Chat Interface**
   - Real-time typing effect
   - Message history
   - Session management
   - Theme switching

3. **Session Management**
   - Save interview progress
   - Resume past sessions
   - Delete conversations
   - Edit session names

## Contact
For questions or support:
- Email: shafay11august@gmail.com
- GitHub: [@joyo11](https://github.com/joyo11)

## Future Enhancements
- Multiple interview templates
- Custom interview flows
- Advanced analytics dashboard
- Video interview integration
- Multi-language support
- Interview scheduling
- PDF report generation

## License
Copyright (c) 2025 Mohammad Shafay Joyo
