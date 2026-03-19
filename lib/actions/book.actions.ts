"use server";

import { connectToDatabase } from "@/database/mongoose";
import Book from "@/database/models/book.model";
import { revalidatePath } from "next/cache";

// A quick helper to turn MongoDB objects into regular JavaScript objects
const serializeData = (data: any) => JSON.parse(JSON.stringify(data));

// A quick helper to create a URL-friendly slug (e.g., "Clean Code" -> "clean-code")
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

export async function createBook(bookData: {
  clerkId: string;
  title: string;
  author: string;
  persona: string;
  fileUrl: string;
  fileBlobKey: string;
  coverUrl?: string;
  fileSize: number;
}) {
  try {
    await connectToDatabase();

    const slug = generateSlug(bookData.title);

    // Check if the book already exists to prevent duplicates
    const existingBook = await Book.findOne({ slug });
    if (existingBook) {
      return { 
        success: true, 
        alreadyExists: true, 
        data: serializeData(existingBook) 
      };
    }

    // Create the new book in the database
    const newBook = await Book.create({
      ...bookData,
      slug,
      totalSegments: 0,
    });

    // Tell Next.js to refresh the homepage so the new book shows up!
    revalidatePath("/");

    return { 
      success: true, 
      data: serializeData(newBook) 
    };

  } catch (error) {
    console.error("Error creating book:", error);
    return { 
      success: false, 
      error: "Failed to create book in database" 
    };
  }
}
// Add this to the bottom of your book.actions.ts file
export async function getAllBooks() {
  try {
    await connectToDatabase();
    
    // Fetch all books and sort them by newest first (-1)
    const books = await Book.find().sort({ createdAt: -1 }).lean();
    
    return { 
      success: true, 
      data: serializeData(books) 
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { success: false, data: [] };
  }
}
