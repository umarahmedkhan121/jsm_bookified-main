import { model, Schema, models } from "mongoose";

const BookSchema = new Schema({
  clerkId: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  author: { type: String, required: true },
  fileURL: { type: String, required: true },
  fileBlobKey: { type: String, required: true },
  fileSize: { type: Number, required: true },
}, { timestamps: true });

const Book = models?.Book || model('Book', BookSchema);
export default Book;