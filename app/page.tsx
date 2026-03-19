import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBooks } from '@/lib/actions/book.actions';

// This forces the page to always fetch the freshest data
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch real books from MongoDB!
  const result = await getAllBooks();
  const books: any[] = result.success ? result.data : [];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-28 wrapper">
        {/* Hero Section */}
        <section className="bg-[#f4f0e6] rounded-xl p-8 flex justify-between items-center mb-12">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold font-serif mb-4">Your Library</h1>
            <p className="mb-6 text-gray-700">Upload a PDF to generate your interactive reading experience.</p>
            <Link href="/books/new" className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
              Add New Book
            </Link>
          </div>
          <div className="hidden md:block">
            <Image src="/assets/hero-illustration.png" alt="Hero Illustration" width={300} height={200} />
          </div>
        </section>
        
        {/* Real Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard 
                key={book._id} 
                title={book.title} 
                author={book.author} 
                coverUrl={book.coverUrl} 
                slug={book.slug} 
              />
            ))
          ) : (
             <div className="col-span-full py-10 text-center">
               <p className="text-gray-500 mb-4">No books in your library yet.</p>
               <Link href="/books/new" className="text-sm font-semibold text-black underline">
                 Upload your first book &rarr;
               </Link>
             </div>
          )}
        </div>
      </div>
    </main>
  );
}