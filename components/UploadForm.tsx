"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { upload } from "@vercel/blob/client";
import { createBook } from "@/lib/actions/book.actions";

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  author: z.string().min(2, "Author is required"),
});

export default function UploadForm() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", author: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded || !user) {
      toast.error("Please log in to upload books.");
      return;
    }
    if (!selectedFile) {
      toast.error("Please select a PDF file.");
      return;
    }

    setIsUploading(true);
    toast.loading("Processing and saving your book...");

    try {
      // 1. Upload PDF to Vercel Blob
      const blob = await upload(selectedFile.name, selectedFile, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      // 2. Save book data to MongoDB
      const bookData = {
        clerkId: user.id,
        title: values.title,
        author: values.author,
        persona: "Rachel", // Default voice for now
        fileUrl: blob.url,
        fileBlobKey: blob.pathname,
        fileSize: selectedFile.size,
      };

      const result = await createBook(bookData);

      toast.dismiss();

      if (result.success) {
        toast.success("Book added successfully to your library!");
        router.push("/"); // Send the user back to the homepage
      } else {
        toast.error(result.error || "Failed to save to database.");
      }
      
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Book Title</label>
        <input 
          {...form.register("title")} 
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black" 
          placeholder="e.g. Clean Code"
        />
        {form.formState.errors.title && <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Author</label>
        <input 
          {...form.register("author")} 
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black" 
          placeholder="e.g. Robert C. Martin"
        />
        {form.formState.errors.author && <p className="text-red-500 text-sm">{form.formState.errors.author.message}</p>}
      </div>

      <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-md p-8 text-center bg-gray-50">
        <input 
          type="file" 
          accept="application/pdf"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="mx-auto block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
        />
        <p className="text-xs text-gray-400 mt-2">Only PDF files up to 50MB</p>
      </div>

      <button 
        type="submit" 
        disabled={isUploading}
        className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition disabled:opacity-50"
      >
        {isUploading ? "Uploading & Saving..." : "Begin Synthesis"}
      </button>
    </form>
  );
}