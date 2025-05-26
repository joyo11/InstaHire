// Mohammad Shafay Joyo @ 2025
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { interviewQuestions } from "@/services/interviewService";
import { generateResponse } from "@/services/openaiService";
import type { Message } from "@/types/chat"; // adjust import path as needed

const prisma = new PrismaClient();

// Helper to convert Prisma message object to your Message type
function toMessage(msg: any): Message {
  return {
    id: String(msg.id),
    role: msg.role === "user" ? "user" : "assistant", // ensure role is correct literal
    content: String(msg.content),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { message, conversationId, isInitial } = req.body;

      // Create or get conversation without modifying metadata
      const conversation = conversationId
        ? await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { messages: true },
          })
        : await prisma.conversation.create({
            data: {
              status: "in_progress",
              metadata: JSON.stringify({ sessionNumber: Date.now() }),
            },
            include: { messages: true },
          });

      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // For initial message, use the initial question
      if (isInitial) {
        const assistantMessage = await prisma.message.create({
          data: {
            content: interviewQuestions.initial.text,
            role: "assistant",
            conversationId: conversation.id,
          },
        });

        return res.status(200).json({
          messages: [toMessage(assistantMessage)],
          conversationId: conversation.id,
        });
      }

      // Save user message
      const userMessage = await prisma.message.create({
        data: {
          content: message,
          role: "user",
          conversationId: conversation.id,
        },
      });

      // Prepare messages for response
      const formattedMessages: Message[] = [
        ...conversation.messages.map(toMessage),
        toMessage(userMessage),
      ];

      // Get current question and generate response
      const currentQuestion = getCurrentQuestion(conversation);
      const botResponse = await generateResponse(
        formattedMessages,
        currentQuestion?.id || ""
      );

      // Save bot response
      const assistantMessage = await prisma.message.create({
        data: {
          content: botResponse,
          role: "assistant",
          conversationId: conversation.id,
        },
      });

      // Don't update metadata based on messages
      await prisma.conversation.update({
        where: { id: conversation.id },
        data: {
          updatedAt: new Date(),
        },
      });

      return res.status(200).json({
        messages: [toMessage(userMessage), toMessage(assistantMessage)],
        conversationId: conversation.id,
        status: currentQuestion?.id === "end" ? "completed" : "in_progress",
      });
    } catch (error) {
      console.error('Error in chat API:', error);
      res.status(500).json({ error: 'Error processing chat' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function processUserResponse(
  metadata: Record<string, any>,
  questionId: string,
  answer: string
): Record<string, any> {
  const newMetadata = { ...metadata };

  switch (questionId) {
    case "position":
      newMetadata.position = answer;
      break;
    case "salary":
      newMetadata.salary = parseInt(answer);
      break;
    case "experience":
      newMetadata.experience = parseInt(answer);
      break;
    case "education":
      newMetadata.education = answer;
      break;
    case "skills":
      newMetadata.skills = answer.split(",").map((skill: string) => skill.trim());
      break;
    case "availability":
      newMetadata.availability = answer;
      break;
  }

  return newMetadata;
}

function getCurrentQuestion(conversation: any) {
  const messageCount = conversation.messages.length;
  const questionKeys = Object.keys(interviewQuestions);
  const currentQuestionIndex = Math.floor(messageCount / 2);
  return interviewQuestions[questionKeys[currentQuestionIndex]];
}
