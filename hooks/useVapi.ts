import { useState, useRef, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

const vapiApiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY || "";
const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "";

export function useVapi(book: any) {
  const [status, setStatus] = useState('idle'); // idle, connecting, speaking, listening
  const [messages, setMessages] = useState<any[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the Vapi instance
    vapiRef.current = new Vapi(vapiApiKey);

    // Set up all the event listeners for the conversation
    vapiRef.current.on('call-start', () => {
      setStatus('listening');
      setIsSessionActive(true);
    });

    vapiRef.current.on('call-end', () => {
      setStatus('idle');
      setIsSessionActive(false);
    });

    vapiRef.current.on('speech-start', () => setStatus('speaking'));
    vapiRef.current.on('speech-end', () => setStatus('listening'));

    // Capture the live transcript to display on the screen
    vapiRef.current.on('message', (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setMessages((prev) => [...prev, { role: message.role, content: message.transcript }]);
      }
    });

    // Cleanup when we leave the page
    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  const startSession = async () => {
    try {
      setStatus('connecting');
      // Start the call and pass the book title/author to the AI's brain
      await vapiRef.current.start(assistantId, {
        variableValues: {
          title: book.title,
          author: book.author,
        }
      });
    } catch (error) {
      console.error("Vapi start error:", error);
      setStatus('idle');
    }
  };

  const stopSession = () => {
    vapiRef.current?.stop();
  };

  return { status, messages, isSessionActive, startSession, stopSession };
}