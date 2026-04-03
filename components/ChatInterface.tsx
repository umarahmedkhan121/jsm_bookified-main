"use client";

import { useState } from "react";
import { Send, Sparkles, User, Loader2 } from "lucide-react";
import { chatWithBook } from "@/lib/actions/book.actions";

export default function ChatInterface({ bookTitle, bookAuthor }: { bookTitle: string, bookAuthor: string }) {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: `Hi! I'm ready to discuss "${bookTitle}". What's on your mind?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await chatWithBook(userMsg, bookTitle, bookAuthor);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* MESSAGES AREA */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'ai' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'
            }`}>
              {msg.role === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
            </div>
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm shadow-sm ${
              msg.role === 'ai' ? 'bg-white rounded-tl-none border text-gray-800' : 'bg-blue-600 rounded-tr-none text-white'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-gray-200" />
            <div className="h-10 w-24 bg-gray-100 rounded-2xl" />
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 border-t bg-white">
        <div className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question..."
            className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-xl outline-none text-sm"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}