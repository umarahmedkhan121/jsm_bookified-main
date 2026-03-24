import { Schema, model, models } from "mongoose";

const BookSegmentSchema = new Schema({
  bookId: { type: String, required: true }, // Links the segment to the specific book
  content: { type: String, required: true }, // The actual text paragraph from the PDF
  pageNumber: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

// This is the magic line that allows the AI to search the text quickly!
BookSegmentSchema.index({ content: "text" });

const BookSegment = models.BookSegment || model("BookSegment", BookSegmentSchema);

export default BookSegment;