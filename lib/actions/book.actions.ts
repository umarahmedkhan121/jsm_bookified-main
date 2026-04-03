"use server";

import { connectToDatabase } from "@/database/mongoose";
import Book from "@/database/models/book.model";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serialize = (data: any) => (data ? JSON.parse(JSON.stringify(data)) : null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBook(bookData: any) {
  try {
    await connectToDatabase();
    const cleanTitle = bookData.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    const generatedSlug = `${cleanTitle}-${Date.now()}`;
    const newBook = await Book.create({ ...bookData, slug: generatedSlug });
    return serialize({ success: true, book: newBook });
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAllBooks() {
  try {
    await connectToDatabase();
    const books = await Book.find().sort({ createdAt: -1 });
    return serialize(books) || [];
  } catch (_error) {
    return [];
  }
}

export async function getBookBySlug(slug: string) {
  if (!slug) return null;
  try {
    await connectToDatabase();
    const book = await Book.findOne({ slug });
    return serialize(book);
  } catch (_error) {
    return null;
  }
}

export async function chatWithBook(userMessage: string, title: string, author: string) {
  if (!userMessage.trim()) return "Please enter a question.";
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });
    const prompt = `Context: Book "${title}" by "${author}". User Question: ${userMessage}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    return `AI Error: ${error.message}`;
  }
}