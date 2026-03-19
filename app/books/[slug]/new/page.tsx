import UploadForm from '@/components/UploadForm';
import Navbar from '@/components/Navbar';

export default function AddNewBook() {
  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <Navbar />
      <div className="pt-28 wrapper max-w-3xl">
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col gap-5">
          <h1 className="text-3xl font-bold font-serif tracking-tight">Add a New Book</h1>
          <p className="text-gray-600">Upload a PDF to generate your interactive reading experience.</p>
          
          <UploadForm />
        </section>
      </div>
    </main>
  );
}