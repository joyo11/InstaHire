// Mohammad Shafay Joyo @ 2025

export type InterviewQuestion = {
  id: string;
  text: string;
  type: "text" | "choice";
  choices?: string[];
  nextQuestion: string | null;
};

export const interviewQuestions: Record<string, InterviewQuestion> = {
  initial: {
    id: "initial",
    text: "Hi! Are you interested in discussing a Full Stack role?",
    type: "text",
    nextQuestion: "greeting",
  },
  greeting: {
    id: "greeting",
    text: "Would you be interested in learning more about this Full Stack role?",
    type: "choice",
    choices: ["Yes", "No"],
    nextQuestion: "name",
  },
  name: {
    id: "name",
    text: "Can I get your name, please?",
    type: "text",
    nextQuestion: "background",
  },
  background: {
    id: "background",
    text: "Do you hold a Bachelor's degree or higher in Computer Science?",
    type: "choice",
    choices: ["Yes", "No"],
    nextQuestion: "experience",
  },
  experience: {
    id: "experience",
    text: "Do you have at least 2 years of work experience in full-stack development?",
    type: "text",
    nextQuestion: "tech_stack",
  },
  tech_stack: {
    id: "tech_stack",
    text: "Which programming languages are you most comfortable with?",
    type: "text",
    nextQuestion: "recent_project",
  },
  recent_project: {
    id: "recent_project",
    text: "Tell me about your most recent project. What was your role and what technologies did you use?",
    type: "text",
    nextQuestion: "salary",
  },
  salary: {
    id: "salary",
    text: "Our salary range is $100,000-$130,000. Does this align with your expectations?",
    type: "choice",
    choices: ["Yes", "No"],
    nextQuestion: "availability",
  },
  availability: {
    id: "availability",
    text: "If selected, when would you be able to start?",
    type: "text",
    nextQuestion: "end",
  },
  end: {
    id: "end",
    text: "Thank you for your time. We'll review your application and get back to you soon.",
    type: "text",
    nextQuestion: null,
  },
};

export function getNextQuestion(currentQuestionId: string, answer: string): string | null {
  const currentQuestion = interviewQuestions[currentQuestionId];
  
  // Early exit conditions
  if (currentQuestionId === "greeting" && answer.toLowerCase() === "no") {
    return "end";
  }
  if (currentQuestionId === "salary" && answer.toLowerCase() === "no") {
    return "end";
  }
  
  return currentQuestion.nextQuestion;
}

export function validateAnswer(questionId: string, answer: string): boolean {
  const question = interviewQuestions[questionId];
  
  if (question.type === "choice" && question.choices) {
    return question.choices.map(c => c.toLowerCase()).includes(answer.toLowerCase());
  }
  
  return answer.trim().length > 0;
} 