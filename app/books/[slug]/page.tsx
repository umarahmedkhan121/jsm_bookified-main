import Navbar from "@/components/Navbar";
import { getBookBySlug } from "@/lib/actions/book.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import VapiControls from "@/components/VapiControls";

export default async function BookDetailsPage({ params }: { params: { slug: string } }) {
  // Fetch the specific book using the URL parameter
  const result = await getBookBySlug(params.slug);

  // If the book doesn't exist, kick the user back to the homepage
  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <Navbar />
      
      <div className="pt-28 wrapper max-w-4xl pb-12">
        <Link href="/" className="text-sm font-medium text-gray-500 hover:text-black mb-6 inline-block transition-colors">
          &larr; Back to Library
        </Link>

        {/* Header Card: Book Info */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-8 items-start mb-8">
          <div className="relative w-32 h-48 rounded-md overflow-hidden shadow-sm shrink-0 bg-gray-100">
            <Image
              src={book.coverUrl || '/assets/book-cover.svg'}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <h1 className="text-3xl font-bold font-serif text-gray-900">{book.title}</h1>
            <p className="text-gray-600 text-lg">by {book.author}</p>
            <div className="flex gap-3 mt-4">
              <span className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Voice: {book.persona || 'Rachel'}
              </span>
              <span className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Ready to talk
              </span>
            </div>
          </div>
        </section>

        {/* Vapi Controls Interactive UI */}
        <VapiControls book={book} />
        
      </div>
    </main>
  );
}