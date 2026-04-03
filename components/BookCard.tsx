import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }: { book: any }) {
  // Using a reliable default book cover
  const coverUrl = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform border border-gray-100">
      <div className="relative w-[140px] h-[200px] rounded-lg overflow-hidden shadow-sm">
        <Image src={coverUrl} alt={book.title} fill className="object-cover" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-bold text-gray-800 line-clamp-1">{book.title}</h3>
        <p className="text-xs text-gray-500">{book.author}</p>
      </div>
      <Link 
        href={`/books/${book.slug}`} 
        className="mt-4 w-full bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
      >
        Open Book
      </Link>
    </div>
  );
}