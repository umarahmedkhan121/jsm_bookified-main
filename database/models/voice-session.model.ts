import { Schema, model, models } from 'mongoose';

const VoiceSessionSchema = new Schema({
  clerkId: { type: String, required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  durationSeconds: { type: Number, required: true, default: 0 },
  billingPeriodStart: { type: Date, required: true },
}, { timestamps: true });

VoiceSessionSchema.index({ clerkId: 1, billingPeriodStart: 1 });

const VoiceSession = models.VoiceSession || model('VoiceSession', VoiceSessionSchema);
export default VoiceSession;