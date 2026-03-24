"use server";

import { connectToDatabase } from "@/database/mongoose";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/book-segment.model";
import { getPlanLimits } from "../subscription.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serializeData = (data: any) => JSON.parse(JSON.stringify(data));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBook(bookData: any) { 
  try {    
    // 1. Get their plan limits
    const limits = await getPlanLimits();
    
    // 2. Count how many books they already have
    const userBookCount = await Book.countDocuments({ clerkId: bookData.clerkId });
    
    // 3. THE LOCK: Block them if they hit their limit!
    if (userBookCount >= limits.maxBooks) {
      return { 
        success: false, 
        error: "You have reached your plan's book upload limit.",
        code: "LIMIT_REACHED" 
      };
    }

    // 4. Generate a URL-friendly slug
    const slug = bookData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    
    // 5. Save the book
    const newBook = await Book.create({ ...bookData, slug });
    
    return { success: true, data: serializeData(newBook) };
  } catch (error) {
    console.error("Error creating book:", error);
    return { success: false, error: "Failed to create book in database." };
  }
}

export async function getAllBooks() {
  try {
    await connectToDatabase();
    const books = await Book.find().sort({ createdAt: -1 }).lean();
    return { success: true, data: serializeData(books) };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { success: false, data: [] };
  }
}

export async function getBookBySlug(slug: string) {
  try {
    await connectToDatabase();
    const book = await Book.findOne({ slug }).lean();
    if (!book) return { success: false, error: "Book not found" };
    return { success: true, data: serializeData(book) };
  } catch (error) {
    console.error("Error fetching single book:", error);
    return { success: false, error: "Failed to fetch book details" };
  }
}

export async function searchBookSegments(bookId: string, query: string) {
  try {
    await connectToDatabase();
    let segments = await BookSegment.find(
      { bookId, $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } }).limit(3).lean();

    if (!segments || segments.length === 0) {
      if (query && query.length > 3) {
        segments = await BookSegment.find({
          bookId,
          content: { $regex: query, $options: "i" }
        }).limit(3).lean();
      }
    }
    return { success: true, data: serializeData(segments) };
  } catch (error) {
    console.error("Error searching segments:", error);
    return { success: false, error: "Failed to search book segments" };
  }
}