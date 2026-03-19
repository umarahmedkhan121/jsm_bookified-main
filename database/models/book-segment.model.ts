import { Schema, model, models } from 'mongoose';

const BookSegmentSchema = new Schema({
  clerkId: { type: String, required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  content: { type: String, required: true },
  segmentIndex: { type: Number, required: true },
  pageNumber: { type: Number, required: true },
  wordCount: { type: Number, required: true },
}, { timestamps: true });

// These indexes make the AI searches incredibly fast
BookSegmentSchema.index({ bookId: 1, segmentIndex: 1 }, { unique: true });
BookSegmentSchema.index({ bookId: 1, pageNumber: 1 });
BookSegmentSchema.index({ content: 'text' }); 

const BookSegment = models.BookSegment || model('BookSegment', BookSegmentSchema);
export default BookSegment;