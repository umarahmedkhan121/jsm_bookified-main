import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import { getAllBooks } from "@/lib/actions/book.actions";
import BookCard from "@/components/BookCard";     // Corrected Path!
import HeroSection from "@/components/HeroSection"; // Corrected Path!

// This forces Next.js to fetch new books from the database every time you refresh
export const dynamic = "force-dynamic";

export default async function Home() {
  const books = await getAllBooks();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 1. The Hero Section (Welcome Area) */}
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* 2. Header with "Add Book" Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="text-blue-600" size={24} />
              Your Personal Library
            </h2>
            <p className="text-gray-500 text-sm">Manage and chat with your uploaded books.</p>
          </div>
          
          <Link
            href="/books/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all font-semibold shadow-md hover:shadow-lg active:scale-95"
          >
            <Plus size={20} />
            Upload New Book
          </Link>
        </div>

        {/* 3. The Responsive Book Grid */}
        {books && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book: any) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          /* 4. The Empty State (Shows when no books exist) */
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <BookOpen size={48} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your library is empty</h3>
            <p className="text-gray-500 max-w-xs mb-8">
              Upload your first PDF to start synthesizing and talking to your books.
            </p>
            <Link
              href="/books/new"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
            >
              Get Started
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}