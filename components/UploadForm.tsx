"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { upload } from "@vercel/blob/client";
import { createBook } from "@/lib/actions/book.actions";
import { toast } from "sonner";

export default function UploadForm() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;

    if (!file || !user) return toast.error("Missing file or user");

    try {
      setLoading(true);
      const blob = await upload(file.name, file, { 
        access: 'public', 
        handleUploadUrl: '/api/upload' 
      });

      const res = await createBook({
        title,
        author,
        clerkId: user.id,
        fileURL: blob.url,
        fileBlobKey: blob.pathname,
        fileSize: file.size,
      });

      if (res.success) {
        toast.success("Uploaded!");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg space-y-4">
      <input name="title" placeholder="Book Title" required className="w-full p-2 border rounded" />
      <input name="author" placeholder="Author" required className="w-full p-2 border rounded" />
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} required className="w-full" />
      <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400">
        {loading ? "Uploading..." : "Upload Book"}
      </button>
    </form>
  );
}