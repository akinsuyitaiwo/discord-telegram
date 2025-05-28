import mongoose from 'mongoose';

const userLinkSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true },
  telegramUsername: { type: String },
  discordId: { type: String, required: true },
  discordUsername: { type: String },
}, { timestamps: true });

export default mongoose.model('UserLink', userLinkSchema);
