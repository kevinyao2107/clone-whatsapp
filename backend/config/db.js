import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connexion = await mongoose.connect(process.env.Mongo_Url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Mongodb connecté:${connexion.connection.host}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
