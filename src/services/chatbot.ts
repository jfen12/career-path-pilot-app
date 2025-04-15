interface ChatResponse {
  content: string;
  followUpQuestions?: string[];
}

const careerTopics = {
  jobSearch: ["job search", "looking for job", "find job", "job hunting"],
  interview: ["interview", "interviewing", "prepare for interview"],
  negotiation: ["salary", "negotiate", "offer", "compensation"],
  careerChange: ["career change", "switch careers", "new career", "transition"],
  skillDevelopment: ["learn", "skill", "develop", "improve", "growth"],
  workLife: ["work life balance", "stress", "burnout", "overwhelmed"],
  leadership: ["leader", "manage", "team lead", "promotion"],
  networking: ["network", "connect", "relationship", "professional connection"],
};

const responses: Record<string, ChatResponse[]> = {
  jobSearch: [
    {
      content: "I understand you're looking for a new job. Let's break this down into manageable steps. What industry or role are you targeting?",
      followUpQuestions: [
        "Have you updated your resume recently?",
        "What kind of companies interest you?",
        "Are you looking for remote, hybrid, or in-person roles?",
      ],
    },
    {
      content: "Job searching can be overwhelming. Let's focus on your unique strengths. What achievements are you most proud of in your career so far?",
    },
  ],
  interview: [
    {
      content: "Interviews can be nerve-wracking, but preparation is key. Would you like to practice some common interview questions together?",
      followUpQuestions: [
        "What type of interview is it?",
        "Have you researched the company?",
        "What questions do you have for the interviewer?",
      ],
    },
  ],
  negotiation: [
    {
      content: "Negotiation is about understanding your value. Let's discuss your experience and market research to build a strong case.",
      followUpQuestions: [
        "Have you researched salary ranges for this role?",
        "What other benefits are important to you?",
        "What's your ideal compensation package?",
      ],
    },
  ],
  careerChange: [
    {
      content: "Career transitions are significant steps. Let's explore what's driving this change and how we can leverage your existing skills.",
      followUpQuestions: [
        "What aspects of your current role do you enjoy?",
        "What field interests you?",
        "Have you considered upskilling opportunities?",
      ],
    },
  ],
  skillDevelopment: [
    {
      content: "Continuous learning is crucial for career growth. What specific skills would you like to develop?",
      followUpQuestions: [
        "Are these skills required for your target role?",
        "Have you looked into any courses or certifications?",
        "How do these skills align with your career goals?",
      ],
    },
  ],
  workLife: [
    {
      content: "Finding the right balance is important for long-term success. Let's identify what's causing stress and develop strategies to manage it.",
      followUpQuestions: [
        "What are your main sources of stress?",
        "Have you set clear boundaries at work?",
        "What activities help you recharge?",
      ],
    },
  ],
  leadership: [
    {
      content: "Leadership is about influence and empowerment. Let's discuss how you can develop your leadership style.",
      followUpQuestions: [
        "What leadership experiences do you have?",
        "What kind of leader do you want to be?",
        "Have you considered mentoring opportunities?",
      ],
    },
  ],
  networking: [
    {
      content: "Building meaningful professional relationships takes time and strategy. Let's explore ways to expand your network authentically.",
      followUpQuestions: [
        "What professional events interest you?",
        "Have you updated your LinkedIn profile?",
        "Who would you like to connect with?",
      ],
    },
  ],
};

export const generateResponse = (message: string): ChatResponse => {
  // Convert message to lowercase for matching
  const lowerMessage = message.toLowerCase();
  
  // Find matching topic
  let matchedTopic: string | null = null;
  for (const [topic, keywords] of Object.entries(careerTopics)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      matchedTopic = topic;
      break;
    }
  }

  if (!matchedTopic) {
    return {
      content: "I'm here to help with your career journey. Could you tell me more about what's on your mind? For example, are you looking for job search advice, interview preparation, or career development guidance?",
    };
  }

  const topicResponses = responses[matchedTopic];
  const randomResponse = topicResponses[Math.floor(Math.random() * topicResponses.length)];
  
  return randomResponse;
};

export const generateFollowUp = (topic: string): string => {
  const followUps = {
    jobSearch: "How has your job search been going so far?",
    interview: "Would you like to practice some interview scenarios?",
    negotiation: "What research have you done about market rates?",
    careerChange: "What inspired you to consider a career change?",
    skillDevelopment: "Which skills would you like to focus on first?",
    workLife: "How do you currently manage your work-life balance?",
    leadership: "What leadership qualities do you admire most?",
    networking: "Have you attended any professional events recently?",
  };

  return followUps[topic as keyof typeof followUps] || "What else would you like to discuss?";
}; 