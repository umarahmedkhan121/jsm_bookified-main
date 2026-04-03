import { getBookBySlug } from "@/lib/actions/book.actions";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ChatInterface from "@/components/ChatInterface";

// Forces the page to always fetch the freshest data from MongoDB
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BookChatPage({ params }: PageProps) {
  // 1. Await the params (Required in Next.js 15+)
  const { slug } = await params;
  
  // 2. Fetch the book from your database
  const book = await getBookBySlug(slug);

  // 3. If no book exists, show the 404 page
  if (!book) {
    return notFound();
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* --- HEADER --- */}
      <header className="h-16 border-b flex items-center justify-between px-6 bg-white shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-all active:scale-90"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-900 leading-none truncate max-w-[200px] md:max-w-md">
              {book.title}
            </h1>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">
              AI Reading Assistant
            </span>
          </div>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        
        {/* LEFT PANEL: PDF VIEWER (Visible on tablets and laptops) */}
        <section className="hidden lg:block w-3/5 p-4 h-full">
          <div className="w-full h-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <iframe 
              src={`${book.fileURL}#view=FitH`} 
              className="w-full h-full"
              title={book.title}
            />
          </div>
        </section>

        {/* RIGHT PANEL: AI CHATBOX */}
        <section className="w-full lg:w-2/5 flex flex-col bg-white lg:shadow-[-10px_0_30px_rgba(0,0,0,0.03)]">
          {/* This component handles all the AI logic. 
              We pass the title and author so Gemini knows what it's talking about.
          */}
          <ChatInterface 
            bookTitle={book.title} 
            bookAuthor={book.author} 
          />
        </section>

      </div>
    </div>
  );
}