import Image from 'next/image';
import Link from 'next/link';

interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string;
  slug: string;
}

export default function BookCard({ title, author, coverUrl, slug }: BookCardProps) {
  return (
    <Link href={`/books/${slug}`}>
      <article className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
        <figure className="flex flex-col items-center gap-4">
          <div className="relative w-[133px] h-[200px] overflow-hidden rounded-md shadow-sm bg-gray-100">
            <Image 
              src={coverUrl || '/assets/book-cover.svg'} 
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="w-full text-center">
            <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
            <p className="text-sm text-gray-500 truncate">{author}</p>
          </figcaption>
        </figure>
      </article>
    </Link>
  );
}