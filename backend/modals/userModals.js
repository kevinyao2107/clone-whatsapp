import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Entrez votre nom svp!'],
    },
    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: [true, 'Entrez votre mot de passe svp!'],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
