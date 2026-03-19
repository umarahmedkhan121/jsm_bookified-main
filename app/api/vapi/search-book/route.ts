import { NextResponse } from 'next/response';
import { searchBookSegments } from '@/lib/actions/book.actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Vapi sends a specific payload when it wants to use a tool
    const { message } = body;
    
    if (message?.type === 'tool-calls' && message.toolCalls) {
      const toolCall = message.toolCalls[0];
      
      // Check if the AI is trying to use our specific "searchBook" tool
      if (toolCall.function.name === 'searchBook') {
        const { bookId, query } = toolCall.function.arguments;
        
        const result = await searchBookSegments(bookId, query);
        
        if (result.success && result.data && result.data.length > 0) {
          // Combine the paragraphs into one big string for the AI to read
          const combinedContent = result.data.map((seg: any) => seg.content).join('\n\n');
          
          return NextResponse.json({
            results: [
              {
                toolCallId: toolCall.id,
                result: combinedContent
              }
            ]
          });
        } else {
          return NextResponse.json({
            results: [
              {
                toolCallId: toolCall.id,
                result: "No relevant information found in the book for this specific topic. Ask the user to rephrase."
              }
            ]
          });
        }
      }
    }
    
    return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    
  } catch (error) {
    console.error("Vapi Tool Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}