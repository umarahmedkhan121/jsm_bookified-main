"use client";

import { useVapi } from "@/hooks/useVapi";

export default function VapiControls({ book }: { book: any }) {
  const { status, messages, isSessionActive, startSession, stopSession } = useVapi(book);

  return (
    <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
      
      {/* Transcript Area */}
      <div className="flex-1 bg-gray-50 rounded-md p-4 mb-6 overflow-y-auto max-h-[300px] border border-gray-100">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">Start the session to speak with the book.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Controls & Status indicator */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className={`w-3 h-3 rounded-full ${
            status === 'listening' ? 'bg-green-500 animate-pulse' : 
            status === 'speaking' ? 'bg-blue-500 animate-pulse' : 
            status === 'connecting' ? 'bg-yellow-500' : 'bg-gray-300'
          }`}></span>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{status}</span>
        </div>

        <button
          onClick={isSessionActive ? stopSession : startSession}
          disabled={status === 'connecting'}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all text-2xl ${
            isSessionActive 
              ? 'bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100 shadow-[0_0_15px_rgba(220,38,38,0.3)]' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {isSessionActive ? '⏹' : '🎙️'}
        </button>
      </div>
    </section>
  );
}