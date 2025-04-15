import { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../../services/chatbot';

interface Message {
  content: string;
  sender: 'user' | 'jen';
  followUpQuestions?: string[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi! I'm Jen, your career coach. How can I help you today?",
      sender: 'jen',
      followUpQuestions: [
        "Looking for job search advice?",
        "Need help preparing for interviews?",
        "Want to discuss career development?"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(input);
      const jenMessage: Message = {
        content: response.content,
        sender: 'jen',
        followUpQuestions: response.followUpQuestions
      };
      
      setMessages(prev => [...prev, jenMessage]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors z-50"
      >
        <img src="/jen-avatar.svg" alt="Jen" className="w-12 h-12" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl transition-all ${isMinimized ? 'h-14' : 'h-[600px]'} z-50`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <img src="/jen-avatar.svg" alt="Jen" className="w-8 h-8" />
          <span className="font-semibold">Jen - Career Coach</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            {isMinimized ? '▲' : '▼'}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            ✕
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
              >
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                {message.followUpQuestions && (
                  <div className="mt-2 space-y-2">
                    {message.followUpQuestions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => {
                          setInput(question);
                          handleSend();
                        }}
                        className="block text-left text-sm text-primary hover:underline"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-500 italic">Jen is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 