import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: [true, 'Entrez votre nom svp!'],
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
    },
    senderId: {
      type: String,
      required: true,
    },
    receverId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model('Message', UserSchema);
